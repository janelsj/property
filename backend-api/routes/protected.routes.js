const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {secret} = require('../constants');

router.use(checkPermission);
function checkPermission(request, response, next) {
    const token = request.headers.authorization.split(' ')[1];

    jwt.verify(token, secret, function(err, decoded){
        if(err){
            console.error(err);
            throw err;
        }
        console.log("decoded:", decoded);
        next();
    });
}

const {updateAgent, deleteAgent} = require('../controllers/agent.controller');
//Change the request.params variable name ':agentId' if required
router.put('/agent/:agentId', async (request,response) => await updateAgent(request,response));
router.delete('/agent/:agentId', async (request,response) => await deleteAgent(request,response));

const {updateCustomer, deleteCustomer, findSelectedCustomer, getAllCustomers} = require('../controllers/customer.controller');
//Change the request.params variable name ':customerId' if required
router.put('/customer/:customerId', async (request,response) => await updateCustomer(request,response));
router.delete('/customer/:customerId', async (request,response) => await deleteCustomer(request,response));
router.get('/customer/:customerId', async (request,response) => await findSelectedCustomer(request,response));
router.get('/customer/allCustomers', async (request,response) => await getAllCustomers(request,response));

const {handleAddProperty, handleUpdateProperty, handleDeleteProperty} = require('../controllers/property.controller');
router.post('/property', async (request,response) => await handleAddProperty(request,response));
//Change the request.params variable name ':propertyId' if required
router.put('/property/:propertyId', async (request,response) => await handleUpdateProperty(request,response));
router.delete('/property/:propertyId', async (request,response) => await handleDeleteProperty(request,response));


module.exports = router;