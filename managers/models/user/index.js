const Client = require('./customer');
const RevokedTokens = require('./revokedTokens');
const User = require('./user')
const Admin = require('./admin')
const Address = require('./address')
const Attendance = require('./Attendance')
const Personal = require('./personal')
const Family = require('./family')
const Professional = require('./professional')
const Education = require('./educationDetails')
const Project = require('./projectDetails')
const WorkExperience = require('./work_experience')
const BankAccount = require('./bank_account')
const TaskList = require('./taskList')
const TimeSheet = require('./timeSheet')
const LeaveStatus = require('./leaveStatus')
const Regularization = require('./regularization')


module.exports = {
    Client,
    Admin,
    User,
    Address,
    Attendance,
    Professional,
    Family,
    Personal,
    RevokedTokens,
    WorkExperience,
    TaskList,
    TimeSheet,
    LeaveStatus,
    Education,
    Project,
    BankAccount,
    Regularization,
}