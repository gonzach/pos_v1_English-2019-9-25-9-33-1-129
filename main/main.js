'use strict';

// function printReceipt(tags){
//     return `***<store earning no money>Receipt ***
//            Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
//            Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
//            Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
//            ----------------------
//            Total：58.50(yuan)
//            Discounted prices：7.50(yuan)
//            **********************`;
// }

// function decodeTags(tags){
//     const item_count = {};
//     tags.forEach((item)=>{
//     item_count[item] = item_count[item] + 1 || 1;
//  });

//     const new_Array = [];
//     for (const [keys, count] of Object.entries(item_count)) {
//         const len = keys.length;
//         if ( len === 10 ) {
//             new_Array.push({barcode: keys, count: count});
//         }
//         else {
//             const new_key = keys.split('-');
//             new_Array.push({barcode: new_key[0], count:  parseFloat(new_key[1])});
//         }
//     }
//     return new_Array;
// }
const fixtures = require('../tests/fixtures');

function loadItems(decodedBarcodes){

    return fixtures.loadAllItems().filter(item => decodedBarcodes.includes(item.barcode));


}





module.exports = {
    checkItemInDatabase: checkItemInDatabase    
};