const service = require("../services/property.service");

async function associateAgentWithProperty(request, response) {
    try{
        const propertyId = Number(request.params.propertyId);
        if(typeof request.body.agentId !== "number" || propertyId === NaN) {
            response.status(404);
            return response.json({message:"Incorrect request data"});
        }
        const result = await service.associate(propertyId, request.body.agentId);
        response.status(result.status);
        return response.json({ data: result.data, message: result.message });
    } catch(error){
        console.log(error);
        throw error;
    }
};

async function removeAgentfromProperty(request, response) {
    try{
        const propertyId = Number(request.params.propertyId);
        if(typeof propertyId === NaN) {
            response.status(400);
            return response.json({message:"Incorrect request data"});
        }
        const result = await service.dissociate(Number(request.params.propertyId));
        response.status(result.status);
        return response.json({ data: result.data, message: result.message });
    } catch(error){
        console.log(error);
        throw error;
    }
};

async function handleAddProperty(request, response){
    try{
        if(typeof request.body.price !== "number" || typeof request.body.noOfBedrooms !== "number" || typeof request.body.sizeInSqFt !== "number") {
            response.status(400);
            return response.json({message:"Incorrect request data"});
        };
        const result = await service.addProperty(request.body.price, request.body.location, request.body.noOfBedrooms, request.body.sizeInSqFt, request.body.isSale, request.body.isRent);
        response.status(result.status);
        return response.json({ data: result.data, message: result.message });
    } catch (error){
        console.log(error);
        throw error;
    }
};

async function handleUpdateProperty(request, response) {
    try{
        if(typeof request.body.price !== "number" || typeof request.body.noOfBedrooms !== "number" || typeof request.body.sizeInSqFt !== "number") {
            response.status(400);
            return response.json({message:"Incorrect request data"});
        };
        const id = Number(request.params.propertyId);
        const result = await service.updateProperty(id, request.body.price, request.body.location, request.body.noOfBedrooms, request.body.sizeInSqFt, request.body.isSale, request.body.isRent);
        response.status(result.status);
        return response.json({ data: result.data, message: result.message });
    } catch (error){
        console.log(error);
        throw error;
    }
};

async function handleDeleteProperty(request, response) {
    try{
        const result = await service.removeProperty(Number(request.params.propertyId));
        response.status(result.status);
        return response.json({message: result.message });
    } catch (error){
        console.log(error);
        throw error;
    }
};

// http://localhost:3000/general/properties/latest/6
async function latest6Properties(request, response) {
    try{
        const result = await service.getLatestProperties();
        return response.json(result);
    } catch (error){
        console.log(error);
        throw error;
    }
};

//GET http://localhost:3000/general/properties/search/price/500000
async function searchPropertiesPrice(request, response) {
    try{
        if (isNaN(Number(request.params.price))) {
            response.status(400);
            return response.json({ message: `${request.params.price} is an incorrect request data for price` });
        }     
        const result = await service.searchPropertiesPrice(Number(request.params.price));    
        response.status(result.status);
        return response.json({ data: result.data, message: result.message });       
    } catch (error){
        console.log(error);
        throw error;
    }
};

// GET http://localhost:3000/general/properties/search/isRent/true
async function searchPropertiesRent(request, response) { 
    try{    
        if ((request.params.isRent).toLowerCase() === 'true' || (request.params.isRent).toLowerCase() === 'false') {
            const result = await service.searchPropertiesRent((request.params.isRent).toLowerCase());    
            response.status(result.status);
            return response.json({ data: result.data, message: result.message }); 
        }
        else {
            response.status(400);
            return response.json({ message: `${request.params.isRent} is an incorrect request data for isRent` });
        } 
    } catch (error){
        console.log(error);
        throw error;
    }  
};

// GET http://localhost:3000/general/properties/search/isSale/true
async function searchPropertiesSale(request, response) {
    try{
        if ((request.params.isSale).toLowerCase() === 'true' || (request.params.isSale).toLowerCase() === 'false') {
            const result = await service.searchPropertiesSale((request.params.isSale).toLowerCase());    
            response.status(result.status);
            return response.json({ data: result.data, message: result.message }); 
        }
        else {
            response.status(400);
            return response.json({ message: `${request.params.isSale} is an incorrect request data for isSale` });
        }
    } catch (error){
        console.log(error);
        throw error;
    }    
};

async function findSelectedProperty(request, response) {
    try{
        const propertyId = Number(request.params.propertyId);
        if(typeof propertyId === NaN) {
            response.status(400);
            return response.json({message:"Incorrect request data"});
        };
        const result = await service.getById(propertyId);
        response.status(result.status);
        return response.json({ data: result.data, message: result.message });
    } catch (error){
        console.log(error);
        throw error;
    }
};

async function getAllProperties(request, response) {
    try{
        const result = await service.getAll();
        response.status(result.status);
        return response.json({ data: result.data, message: result.message });
    } catch (error){
        console.log(error);
        throw error;
    }
};



module.exports = {
    handleAddProperty,
    associateAgentWithProperty,
    removeAgentfromProperty,
    handleUpdateProperty,
    handleDeleteProperty,
    latest6Properties,
    searchPropertiesPrice,
    searchPropertiesRent,
    searchPropertiesSale,
    findSelectedProperty,
    getAllProperties,    
}