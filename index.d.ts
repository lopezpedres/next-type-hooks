// Types for Users
type TUserId= string
type TUser= {
        name: string
        lastname?: string
        admin: boolean
        birthday?: Date

}

type TUsers=TUser[]

//Types for suppliers
type TSupplierId= string
type TSupplier= {
        id?: TSupplierId
        name: string
        email: string
        description: string

}

type TSuppliers=TSupplier[]

// Types for ingredients
type TIngredientId=string
type TIngredient={
        name: string
        quantity: number
        supplierId:TSupplierId
}