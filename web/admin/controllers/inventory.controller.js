const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { format, addDays, isSameISOWeek, getISOWeek } = require('date-fns');
const { generateAccessToken } = require('../middlewares/auth.middleware');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');

module.exports = {

  //GET Add Inventory
  getAddInventory: async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        res.render('a-login', {
          title: "Advaxo",
          error: "User Not Found"
        })
      }

      const products = await models.ProductModel.Product.find().sort({ created_date: -1 });
      const live_stock = await models.ProductModel.Stocks.find().sort({ created_date: -1 }).populate('product_id');

      console.log(products)

      res.render('admin/products/add-products', {
        title: "Advaxo",
        user,
        products,
        live_stock,
        error: "Add New Product"
      })
    } catch (err) {
      const user = req.user;
      res.render('admin/products/add-products', {
        title: "Advaxo",
        user,
        error: err
      })
    }
  },

  getInventoryList: async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        res.render('a-login', {
          title: "Advaxo",
          error: "User Not Found"
        })
      }

      const products = await models.ProductModel.Product.find().sort({ created_date: -1 });
      const live_stock = await models.ProductModel.Stocks.find().sort({ created_date: -1 }).populate('product_id');

      console.log(products)

      res.render('admin/products/product-list', {
        title: "Advaxo",
        user,
        products,
        options,
        live_stock,
        error: "Add New Product"
      })
    } catch (err) {
      const user = req.user;
      res.render('admin/products/product-list', {
        title: "Advaxo",
        user,
        error: err
      })
    }
  },

  postAddInventory: async (req, res) => {
    const referer = req.get('Referer');
    try {
      const user = req.user;
      if (!user) {
        return res.render('a-login', {
          title: "Advaxo",
          error: "User Not Found"
        });
      }

      const server = req.body;
      console.log(server)

      const productData = {
        vendor: server.vendor,
        name: server.name.toLowerCase(),
        unit: server.unit,
        bill_no: server.bill_no,
        date: server.date,
        width: parseFloat(server.width) || 0,
        height: parseFloat(server.height) || 0,
        quantity: parseFloat(server.quantity),
        area: parseFloat(server.total_area) || 0,
        rate: parseFloat(server.rate),
        amount: parseFloat(server.total_amount),
        gst: server.gst,
        payment_method: server.payment_method
      };

      const name = server.name.toLowerCase();

      let product = await models.ProductModel.Product.findOne({ name: name });
      if (!product) {

        if (server.payment_method === "CASH" || server.payment_method === "NET BANK" || server.payment_method === "IDFC SAM" || server.payment_method === "IDFC SWATI") {
          const from = await models.ProductModel.Bank.findOne({ name: productData.payment_method });

          from.amount = Number(from.amount) - Number(server.total_amount);
          await from.save();

          const debitTransactionData = {
            type: from.name, // You can adjust the type based on your requirements
            from: "Purchase",
            to: `Product -- ${server.name}`,
            transaction_id: uuidv4(), // Assuming bank _id is unique identifier for transaction
            debited: productData.amount,
            credited: 0.0,
            available: Number(from.amount),
            date: server.date || formattedDate
          };

          const debitTransaction = new models.ProductModel.Transaction(debitTransactionData);
          await debitTransaction.save();
        } else {
          console.log("passed")
        }

        product = await models.ProductModel.Product.create(productData);
      } else {
        res.redirect(`/admin/inventory/product-list?error=${encodeURIComponent("Product Already Exist")}`)
      }

      let stocks = await models.ProductModel.Stocks.findOne({ product_id: product._id });
      if (!stocks) {
        stocks = await models.ProductModel.Stocks.create({
          unit: product.unit,
          product_id: product._id,
          quantity: product.unit === 'SQRFT' ? 0 : parseFloat(product.quantity),
          area: product.unit === 'SQRFT' ? parseFloat(product.area) : 0,
          rate: parseFloat(product.rate),
          amount: parseFloat(product.amount)
        });
      } else {
        stocks.quantity += product.unit === 'SQRFT' ? 0 : parseFloat(product.quantity);
        stocks.area += product.unit === 'SQRFT' ? parseFloat(product.area) : 0;
        stocks.amount += parseFloat(product.amount);
        await stocks.save();
      }

      const successMsg = `${server.name} - ${product ? 'Updated' : 'Added'} Successfully`;
      res.redirect(`/admin/inventory/product-list?success=${encodeURIComponent(successMsg)}`);
    } catch (err) {
      console.error(err);
      const errorMsg = 'An error occurred while adding inventory';
      res.redirect(`/admin/inventory/add-product?error=${encodeURIComponent(errorMsg)}`);
    }
  },

  getUpdateInventory: async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        res.render('a-login', {
          title: "Advaxo",
          error: "User Not Found"
        })
      }

      const product_id = req.params.product_id;

      const product = await models.ProductModel.Product.findById(product_id);

      res.render('admin/products/update-products', {
        title: "Advaxo",
        user,
        product,
        error: "Add New Product"
      })
    } catch (err) {
      console.log(err)
      res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
    }
  },

  postUpdateInventory: async (req, res) => {
    try {
      const user = req.user;

      console.log(req.body)
      if (!user) {
        res.render('a-login', {
          title: "Advaxo",
          error: "User Not Found"
        })
      }

      const server = req.body;
      console.log(server)
      const product_id = req.params.product_id;
      const product = await models.ProductModel.Product.findById(product_id);

      if (!product) {
        res.redirect(`/admin/inventory/add-product?error=${encodeURIComponent("Product Not Found")}`)
      }
      const difference = Number(product.amount) - Number(server.total_amount);
      const payment_method = server.payment_method || product.payment_method;
      const date = server.date || product.date || formattedDate;


      if (product.amount < server.total_amount) {

        const from = await models.ProductModel.Bank.findOne({ name: payment_method });

        from.amount = (Number(from.amount) + Number(product.amount)) - Number(server.total_amount);

        await from.save();

        const debitTransactionData = {
          type: payment_method, // You can adjust the type based on your requirements
          from: "Purchase",
          to: `Product -- ${server.name}`,
          transaction_id: uuidv4(), // Assuming bank _id is unique identifier for transaction
          debited: difference,
          credited: 0.0,
          available: Number(from.amount),
          date: formattedDate
        };

        const debitTransaction = new models.ProductModel.Transaction(debitTransactionData);
        await debitTransaction.save();
      } else if (product.amount > server.total_amount) {
        const from = await models.ProductModel.Bank.findOne({ name: payment_method });

        from.amount = (Number(from.amount) + Number(product.amount)) - Number(server.total_amount);
        await from.save();

        const debitTransactionData = {
          type: payment_method, // You can adjust the type based on your requirements
          from: "Purchase",
          to: `Product -- ${server.name}`,
          transaction_id: uuidv4(), // Assuming bank _id is unique identifier for transaction
          debited: 0.0,
          credited: difference,
          available: Number(from.amount),
          date: formattedDate
        };

        const debitTransaction = new models.ProductModel.Transaction(debitTransactionData);
        await debitTransaction.save();
      } else {
        if (product.payment_method === "Unpaid" && (server.payment_method === "CASH" || server.payment_method === "IDFC SWATI" || server.payment_method === "IDFC SAM" || server.payment_method === "Net Bank")) {
          console.log("UNPAID TO CASH")
          const from = await models.ProductModel.Bank.findOne({ name: payment_method });

          from.amount = Number(from.amount) - Number(server.total_amount);

          await from.save();

          const debitTransactionData = {
            type: payment_method, // You can adjust the type based on your requirements
            from: "Purchase",
            to: `Product -- ${server.name}`,
            transaction_id: uuidv4(), // Assuming bank _id is unique identifier for transaction
            debited: Number(server.total_amount),
            credited: 0.0,
            available: Number(from.amount),
            date: formattedDate
          };

          const debitTransaction = new models.ProductModel.Transaction(debitTransactionData);
          await debitTransaction.save();
        } else if (server.payment_method !== "Unpaid" && server.payment_method !== product.payment_method) {
          console.log("PAID TO PAID")
          const from = await models.ProductModel.Bank.findOne({ name: server.payment_method });
          const to = await models.ProductModel.Bank.findOne({ name: product.payment_method });

          // Calculate the amount to be transferred
          const amount = Number(server.total_amount);
          console.log(amount)

          // Update the 'from' bank's amount (debit)
          from.amount = Number(from.amount) - amount;
          await from.save();

          // Update the 'to' bank's amount (credit)
          to.amount = Number(to.amount) + amount;
          await to.save();

          // Create a transaction record for debit
          const debitTransactionData = {
            type: from.name, // You can adjust the type based on your requirements
            from: "Purchase",
            to: `Product -- ${server.name}`,
            transaction_id: uuidv4(), // Assuming bank _id is unique identifier for transaction
            debited: amount,
            credited: 0.0,
            available: Number(from.amount),
            date: server.date || formattedDate
          };

          console.log(debitTransactionData)
          const debitTransaction = new models.ProductModel.Transaction(debitTransactionData);
          await debitTransaction.save();

          // Create a transaction record for credit
          const creditTransactionData = {
            type: to.name, // You can adjust the type based on your requirements
            from: "Purchase Refund",
            to: `Product -- ${server.name}`,
            transaction_id: uuidv4(), // Assuming bank _id is unique identifier for transaction
            debited: 0.0,
            credited: amount,
            available: Number(to.amount),
            date: server.date || formattedDate
          };
          console.log(creditTransactionData)
          const creditTransaction = new models.ProductModel.Transaction(creditTransactionData);
          await creditTransaction.save();
        } else if (server.payment_method === "Unpaid" && (product.payment_method === "CASH" || product.payment_method === "IDFC SWATI" || product.payment_method === "IDFC SAM" || product.payment_method === "Net Bank")) {
          console.log("PAID TO UNPAID")
          const from = await models.ProductModel.Bank.findOne({ name: product.payment_method });

          from.amount = Number(from.amount) + Number(server.total_amount);

          await from.save();

          const debitTransactionData = {
            type: product.payment_method, // You can adjust the type based on your requirements
            from: "Purchase Refund",
            to: `Product -- ${server.name}`,
            transaction_id: uuidv4(), // Assuming bank _id is unique identifier for transaction
            debited: 0.0,
            credited: Number(server.total_amount),
            available: Number(from.amount),
            date: formattedDate
          };

          const debitTransaction = new models.ProductModel.Transaction(debitTransactionData);
          await debitTransaction.save();
        } else {
          console.log("Passed")
        }
      }


      product.name = server.name;
      product.width = server.width;
      product.bill_no = server.bill_no;
      product.date = server.date || product.date;
      product.height = server.height;
      product.unit = server.unit || product.unit;
      product.quantity = server.quantity;
      product.area = server.total_area;
      product.rate = server.rate;
      product.amount = server.total_amount;
      product.payment_method = server.payment_method || product.payment_method;

      await product.save();

      let stocks = await models.ProductModel.Stocks.findOne({ product_id: product._id });
      if (!stocks) {
        const expense = await models.ProductModel.Expense.find({ product_id: product_id });

        const total_area = expense.reduce((sum, expense) => parseFloat(sum) + parseFloat(expense.area), 0).toFixed(2);
        const total_quantity = expense.reduce((sum, expense) => parseFloat(sum) + parseFloat(expense.quantity), 0).toFixed(2);
        const total_amount = expense.reduce((sum, expense) => parseFloat(sum) + parseFloat(expense.amount), 0).toFixed(2);
        stocks = await models.ProductModel.Stocks.create({
          unit: product.unit,
          product_id: product._id,
          quantity: product.unit === 'SQRFT' ? 0 : parseFloat(product.quantity) - parseFloat(total_quantity),
          area: product.unit === 'SQRFT' ? parseFloat(product.area) - parseFloat(total_area) : 0,
          rate: parseFloat(product.rate),
          amount: parseFloat(product.amount) - parseFloat(total_amount)
        });
        await stocks.save();
      } else {
        const expense = await models.ProductModel.Expense.find({ product_id: product_id });

        const total_area = expense.reduce((sum, expense) => parseFloat(sum) + parseFloat(expense.area), 0).toFixed(2);
        const total_quantity = expense.reduce((sum, expense) => parseFloat(sum) + parseFloat(expense.quantity), 0).toFixed(2);
        const total_amount = expense.reduce((sum, expense) => parseFloat(sum) + parseFloat(expense.amount), 0).toFixed(2);

        console.log(total_quantity)
        stocks.quantity = (product.unit === 'SQRFT' ? 0 : parseFloat(product.quantity) - parseFloat(total_quantity));;
        stocks.area = (product.unit === 'SQRFT' ? parseFloat(product.area) - parseFloat(total_area) : 0);
        stocks.amount = parseFloat(product.amount) - parseFloat(total_amount);
        rate = parseFloat(product.rate),
          await stocks.save();
        console.log(stocks)
      }

      const successMsg = `${server.name} -- Updated Successfully`;
      res.redirect(`/admin/inventory/product-list?success=${encodeURIComponent(successMsg)}`)
    } catch (err) {
      console.log(err)
      res.redirect(`/admin/inventory/update-product?error=${encodeURIComponent(err)}`)
    }
  },

  deleteInventory: async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.render('a-login', {
          title: "Advaxo",
          error: "User Not Found"
        });
      }

      const product_id = req.params.product_id;

      console.log(product_id);
      console.log("Hit");

      const expense = await models.ProductModel.Expense.find({ product_id: product_id }).populate('product_id');

      if (expense.length > 0) {
        const errorMsg = "Product has been issued for Work Order";
        return res.status(400).json(errorMsg);
      } else {
        const product = await models.ProductModel.Product.findByIdAndDelete(product_id);
        const stock = await models.ProductModel.Stocks.findOneAndDelete({ product_id: product_id });

        console.log("found && deleted");

        // Reverse Transaction of the product
        if (product.payment_method === 'CASH' || product.payment_method === 'NET BANK' || product.payment_method === 'IDFC SWATI' || product.payment_method === 'IDFC SAM') {

          const from = await models.ProductModel.Bank.findOne({ name: product.payment_method });

          from.amount = (Number(from.amount) + Number(product.amount));

          await from.save();

          const debitTransactionData = {
            type: from.name, // You can adjust the type based on your requirements
            from: "Purchase Refund",
            to: `Product -- ${product.name}`,
            transaction_id: uuidv4(), // Assuming bank _id is unique identifier for transaction
            debited: 0.0,
            credited: product.amount,
            available: Number(from.amount),
            date: formattedDate
          };

          const debitTransaction = await models.ProductModel.Transaction.create(debitTransactionData);
          await debitTransaction.save();

        } else {
          console.log("Passed")
        }


        if (!product) {
          const errorMsg = "Product Not Found";
          return res.status(404).json({ error: errorMsg });
        }

        const successMsg = `${product.name} -- Deleted Successfully`;
        return res.status(200).json({ success: successMsg });
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.message || "Internal Server Error";
      return res.status(500).json({ error: errorMsg });
    }
  },

  getProduct: async (req, res) => {
    const referer = req.get('Referer');
    try {
      const user = req.user;

      if (!user) {
        res.render('a-login', {
          title: "Advaxo",
          error: "User Not Found"
        })
      }

      const product_id = req.params.product_id;

      const product = await models.ProductModel.Product.findById(product_id);

      console.log(product)

      res.json(product)
    } catch (err) {
      console.log(err)
      res.redirect(`${referer}?error=${encodeURIComponent(err)}`)
    }
  }


}

