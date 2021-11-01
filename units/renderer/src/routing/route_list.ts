export type RouteConf = { name: string, path: string };

export const appRoutes = {
    inventory: {
        itemsManagement: { name: "Items Management", path: "/inv/items-management" },
        stocks:          { name: "Stocks"          , path: "/inv/stocks"           },
        rawMaterial:     { name: "Raw Material"    , path: "/inv/raw-material"     },
        products:        { name: "Products"        , path: "/inv/products"         },
        categories:      { name: "Categories"      , path: "/inv/categories"       },
        purchaseOrders:  { name: "Purchase Orders" , path: "/inv/p-orders"         },
    },
    suppliers: {
        list:   { name: "Suppliers List", path: "/sup/list" },
        add:    { name: "Add Suppliers", path: "/sup/add" }
    },
    customers: {
        list:       { name: "Customer List"     , path: "/cst/list" },
        add:        { name: "Add Customer"      , path: "/cst/add"  }
    }
};

export const devAppRoutes = {
    scratch: { name: "Scratch Place", path: "/dev/scratch" }
};
