export const BACKEND_URL = 'http://localhost:8001';

export const EDI_TRANSACTIONS = [
    {
        id: 1,
        code: 'EDI810',
        name: 'Invoice'
    },
    {
        id: 2,
        code: 'EDI850',
        name: 'Purchase Order'
    },
    {
        id: 3,
        code: 'EDI855',
        name: 'Purchase Order Acknowledgment'
    },
    {
        id: 4,
        code: 'EDI820',
        name: 'Payment Order'
    },
    {
        id: 5,
        code: 'EDI997',
        name: 'Functional Acknowledgement'
    }
]

export const ITEM_TYPES = [
    {
        id: 1,
        name: 'Manufacturer'
    },
    {
        id: 2,
        name: 'Supplier Warehouse'
    },
    {
        id: 3,
        name: 'Retailer Warehouse'
    },
    {
        id: 4,
        name: 'Retailer'
    }
]