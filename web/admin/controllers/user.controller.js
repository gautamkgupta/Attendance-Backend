const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Address
    getAddUser: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const userAll = await models.CustomerModel.User.find();
            console.log("All User: ", userAll);

            res.render('admin/user/add-user', {
                title: "TYS",
                user,
                userAll,
                error: "Add New Address"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/user/add-user', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getUserList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const userAll = await models.CustomerModel.User.find().exec();
            console.log("All User: ", userAll);

            res.render('admin/user/all-user', {
                title: "TYS-All_User",
                user,
                userAll,
                error: "Add New User"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/user/all-user', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddUser: async (req, res) => {
        const referer = req.get('Referer');
        try {
            // const user = req.user;
            // if (!user) {
            //     return res.render('a-login', {
            //         title: "TYS",
            //         error: "User Not Found"
            //     });
            // }

            const server = req.body;
            console.log(server)

            // Check if the email already exists
            const existingUser = await models.CustomerModel.User.findOne({ email: server.email });
            if (existingUser) {
                // return res.status(400).json({ message: "Email Already Used!.." });
                // console.log(Email Already Used!..);
                const errorMsg = 'Email Already Used!..';
                res.redirect(`/admin/user/add-user?error=${encodeURIComponent(errorMsg)}`);
            }

            const UserData = new models.CustomerModel.User({
                _id: new mongoose.Types.ObjectId(),
                first_name: server.first_name,
                last_name: server.last_name,
                profile_url: server.profile_url,
                email: server.email,
                phone: server.phone,
                password: server.password,
                is_active: server.is_active
            });

            console.log(UserData)
            UserData.save();

            const successMsg = `${server.first_name} - ${UserData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/user/all-user?success=${encodeURIComponent(successMsg)}`);
        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            // res.redirect(`/admin/user/add-user?error=${encodeURIComponent(errorMsg)}`);
        }
    },

    getUpdateUser: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const user_id = req.params.user_id;

            const UserData = await models.CustomerModel.User.findById(user_id);

            res.render('admin/user/edit-user', {
                title: "TYS",
                user_id,
                user,
                UserData,
                error: "Update User"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateUser: async (req, res) => {
        try {
            const user = req.user;

            console.log(req.body)
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            // console.log(server)
            const user_id = req.params.user_id;
            const UserRecord = await models.CustomerModel.User.findById(user_id);

            if (!UserRecord) {
                res.redirect(`/admin/user/add-user?error=${encodeURIComponent("User Record Not Found")}`)
            }

            // Check if the email already exists
            const existingUser = await models.CustomerModel.User.findOne({ email: server.email });
            if (!existingUser) {
                const errorMsg = 'Email-Id Not Fetch!..';
                res.redirect(`/admin/user/add-user?error=${encodeURIComponent(errorMsg)}`);
            }

            UserRecord.profile_url = server.profile_url;
            UserRecord.first_name = server.first_name;
            UserRecord.last_name = server.last_name;
            UserRecord.email = server.email;
            UserRecord.phone = server.phone;
            UserRecord.password = server.password;
            UserRecord.is_active = server.is_active;

            await UserRecord.save();


            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/user/all-user?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            // res.redirect(`/admin/user/edit-user?error=${encodeURIComponent(err)}`);

        }
    },

    // deleteUser: async (req, res) => {
    //     try {
    //         const user = req.user;

    //         if (!user) {
    //             return res.render('a-login', {
    //                 title: "TYS",
    //                 error: "User Not Found"
    //             });
    //         }

    //         const user_id = req.params.user_id;
    //         console.log(product_id);

    //         const UserRecord = await models.CustomerModel.User.findByIdAndDelete({ _id: user_id });
    //         console.log("Deleted Record: ", UserRecord);

    //         const successMsg = `${product.name} -- Deleted Successfully`;
    //         return res.status(200).json({ success: successMsg });
    //     } catch (err) {
    //         console.error(err);
    //         const errorMsg = err.message || "Internal Server Error";
    //         return res.status(500).json({ error: errorMsg });
    //     }
    // },

    // Delete Category
    deleteUser: async (req, res) => {
        try {
            const user_id = req.params.user_id;
            console.log("Deleting User with ID:", user_id);

            // Find and delete the product from the database
            const deletedUser = await models.CustomerModel.User.findOneAndDelete({ _id: user_id });

            if (!deletedUser) {
                // product not found in the database
                throw new Error('${} not found.');
            }

            console.log(`${deletedUser.name} deleted successfully`);

            res.status(200).json({ message: `${deletedUser.name} deleted successfully` });
        } catch (err) {
            console.log(`There is an issue while deleting the ${deletedUser.name}.`);
            console.log(err.message);
            res.status(400).send(err.message);
        }
    }

    //   getProduct: async (req, res) => {
    //     const referer = req.get('Referer');
    //     try {
    //       const user = req.user;

    //       if (!user) {
    //         res.render('a-login', {
    //           title: "Advaxo",
    //           error: "User Not Found"
    //         })
    //       }

    //       const product_id = req.params.product_id;

    //       const product = await models.ProductModel.Product.findById(product_id);

    //       console.log(product)

    //       res.json(product)
    //     } catch (err) {
    //       console.log(err)
    //       res.redirect(`${referer}?error=${encodeURIComponent(err)}`)
    //     }
    //   }

}