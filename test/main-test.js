'use strict';

describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  
  it ('Should decode tags', () => {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const result = add.decodeTags(tags);
    const expectedText = [
      {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3.00,
        count: 5
      },
      {
        barcode: 'ITEM000003',
        name: 'Litchi',
        unit: 'pound',
        price: 15.00,
        count: 2.5
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        unit: 'pound',
        price: 5.50,
        count: 1
      }
  ];
    expect(result).toBe(expectedText);
  });

  it ('Should decode barcodes', () => {
    const tags = [
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000001-2',
      'ITEM000002',
    ];
    const result = add.decodeBarcodes(tags);
    const expectedText = [
      {
        barcode: 'ITEM000000',
        count: 5, 
      },
      {
        barcode: 'ITEM000001',
        count: 2, 
      },
      {
        barcode: 'ITEM000002',
        count: 1, 
      },
  ];
    expect(result).toBe(expectedText);
  });

  it ('Should combine Items', () => {
    const decodedBarcodes = [
      {
        barcode: 'ITEM000000',
        count: 5, 
      },
      {
        barcode: 'ITEM000001',
        count: 2, 
      },
      {
        barcode: 'ITEM000002',
        count: 1, 
      },
  ];
    const result = add.combineItems(decodedBarcodes);
    const expectedText = [
      {
        barcode: 'ITEM000000',
        name: 'Coca-Cola',
        unit: 'bottle',
        price: 3.00,
        count: 5
      },
      {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3.00,
        count: 2
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        unit: 'pound',
        price: 5.50,
        count: 1
      }
  ];
    expect(result).toBe(expectedText);
  });

  it ('Should load Items', () => {
    const decodedBarcodes = [
      {
        barcode: 'ITEM000000',
        count: 5, 
      },
      {
        barcode: 'ITEM000001',
        count: 2, 
      },
      {
        barcode: 'ITEM000002',
        count: 1, 
      },       
  ];
    const result = add.loadItems(decodedBarcodes);
    const expectedText = [
      {
        barcode: 'ITEM000000',
        name: 'Coca-Cola',
        unit: 'bottle',
        price: 3.00,
      },
      {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3.00,
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        unit: 'pound',
        price: 5.50,
      }           
  ];
    expect(result).toBe(expectedText);
  });

  
  it ('Should calculate receipt', () => {
    const decodedBarcodes = [
      {
        barcode: 'ITEM000000',
        name: 'Coca-Cola',
        unit: 'bottle',
        price: 3.00,
        count: 5
      },
      {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3.00,
        count: 2
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        unit: 'pound',
        price: 5.50,
        count: 1
      }     
  ];
    const result = add.calculateReceipt(decodedBarcodes);
    const expectedText = [
      {
        receipt: [ 
          {
            barcode: 'ITEM000000',
            name: 'Coca-Cola',
            unit: 'bottle',
            price: 3.00,
            count: 5,
            subtotal: ,
          },
          {
            barcode: 'ITEM000001',
            name: 'Sprite',
            unit: 'bottle',
            price: 3.00,
            count: 2,
            subtotal: ,
          },
          {
            barcode: 'ITEM000002',
            name: 'Apple',
            unit: 'pound',
            price: 5.50,
            count: 1,
            subtotal: ,
          }
        ],
      },     
  ];
    expect(result).toBe(expectedText);
  });

  it ('Should calculate receipt item', () => {
    const decodedBarcodes = [
      {
        barcode: 'ITEM000000',
        name: 'Coca-Cola',
        unit: 'bottle',
        price: 3.00,
        count: 5
      },
      {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3.00,
        count: 2
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        unit: 'pound',
        price: 5.50,
        count: 1
      }      
  ];
    const result = add.calculateReceiptItem(decodedBarcodes);
    const expectedText = [
      {
        barcode: 'ITEM000000',
        name: 'Coca-Cola',
        unit: 'bottle',
        price: 3.00,
        count: 5,
        subtotal: ,
      },
      {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3.00,
        count: 2,
        subtotal: ,
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        unit: 'pound',
        price: 5.50,
        count: 1,
        subtotal: ,
      }
  ];
    expect(result).toBe(expectedText);
  });

  it ('Should load all promotion', () => {
    const promotion = [
      {
          type: 'BUY_TWO_GET_ONE_FREE',
          barcodes: [
            'ITEM000000',
            'ITEM000001',
            'ITEM000005'
          ]
      }
  ];
    const result = add.getpromotion(promotion);
  });

  // it ('Should promote receipt item', () => {
  //   const decodedBarcodes = [
  //     {
  //       barcode: 'ITEM000001',
  //       name: 'Badminton',
  //       count: 5,
  //       unit: 'bottle',
  //       price: 3.00
  //     },
  //     {
  //       barcode: 'ITEM000003',
  //       name: 'Apple',
  //       count: 2,
  //       unit: 'pounds',
  //       price: 1.00
  //     },
  //     {
  //       barcode: 'ITEM000005',
  //       name: 'Coca-Cola',
  //       count: 3,
  //       unit: 'bottle',
  //       price: 5.50
  //     },         
  // ];
    
  //   const expectedText = [
  //     {
  //       type: 'BUY_TWO_GET_ONE_FREE',
  //       barcodes: [
  //         'ITEM000000',
  //         'ITEM000001'
  //       ]
  //     },
  //     {
  //       type: 'OTHER_PROMOTION',
  //       barcodes: [
  //         'ITEM000003',
  //         'ITEM000004'
  //       ]
  //     }
  // ];
  //   const result = add.getpromotion(expectedText);
  // });

  it ('Should calculate receipt total', () => {
    const decodedBarcodes = [
      {
        barcode: 'ITEM000001',
        name: 'Badminton',
        count: 5,
        unit: 'bottle',
        price: 3.00
      },
      {
        barcode: 'ITEM000003',
        name: 'Apple',
        count: 2,
        unit: 'pounds',
        price: 1.00
      },
      {
        barcode: 'ITEM000005',
        name: 'Coca-Cola',
        count: 3,
        unit: 'bottle',
        price: 5.50
      },         
  ];
    const result = add.calculateReceiptTotal(decodedBarcodes);
    const expectedText = [
        {
          barcode: 'ITEM000001',
          name: 'Badminton',
          price: 3.00,
          unit: 'bottle',
          count: 5,
          suntotal: 4.00(yuan)
        },
        {
          barcode: 'ITEM000003',
          name: 'Apple',
          price: 1.00,
          unit: 'pounds',
          count: 2,
          suntotal: 11.00(yuan),
        },
        {
          barcode: 'ITEM000005',
          name: 'Coca-Cola',
          price: 3,
          unit: 'bottle',
          count: 3,
          suntotal: 6.00(yuan)
        }
  ];
    expect(result).toBe(expectedText);
  });

  it ('Should calculate receipt saving', () => {
    const decodedBarcodes = [
      {
        barcode: 'ITEM000001',
        name: 'Badminton',
        count: 5,
        unit: 'bottle',
        price: 3.00
      },
      {
        barcode: 'ITEM000003',
        name: 'Apple',
        count: 2,
        unit: 'pounds',
        price: 1.00
      },
      {
        barcode: 'ITEM000005',
        name: 'Coca-Cola',
        count: 3,
        unit: 'bottle',
        price: 5.50
      },         
  ];
    const result = add.calculateReceiptSavings(decodedBarcodes);
    const expectedText = [
        {
          barcode: 'ITEM000001',
          name: 'Badminton',
          price: 3.00,
          unit: 'bottle',
          count: 5,
          suntotal: 4.00(yuan)
        },
        {
          barcode: 'ITEM000003',
          name: 'Apple',
          price: 1.00,
          unit: 'pounds',
          count: 2,
          suntotal: 11.00(yuan),
        },
        {
          barcode: 'ITEM000005',
          name: 'Coca-Cola',
          price: 3,
          unit: 'bottle',
          count: 3,
          suntotal: 6.00(yuan)
        }
  ];
    expect(result).toBe(expectedText);
  });

});
