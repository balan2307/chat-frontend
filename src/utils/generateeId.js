const { v4: uuidv4 } = require('uuid');

function generateId()
{

    return uuidv4()
}
export default generateId