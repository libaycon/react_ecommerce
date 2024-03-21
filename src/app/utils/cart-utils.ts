
interface AddToCartState {
    errors?: {
        token?: string;
        quantity?: string;
        productId?: string;
    },
    success?: string;
}
const token = localStorage.getItem('token');
//console.log(token)
export async function addToCart(quantity: number, productId: number): Promise<AddToCartState> {
    if (!token) {
        return {
            errors: {
                token: 'false'
            }
        }
    }

    const response = await fetch('https://e-commerce-api-v2.academlo.tech/api/v1/cart', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "productId": productId,
            "quantity": quantity
        })
    });

    if (!response.ok) {
        return {
            errors: {
                productId: 'false'
            }
        }
    }
    const data = await response.json();
    return data;
}

export interface UpdateState {
    errors?: {
        token?: string;
        quantity?: string;
    },
    success?: {
        data: {
            productId: number;
            quantity: number;
        }
    };

}

export async function updateQuantity(quantity: number, itemId: number): Promise<UpdateState> {
    if (!token) {
        return {
            errors: {
                token: 'false'
            }
        }
    }

    const response = await fetch(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${itemId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "quantity": quantity
        }),
        redirect: 'follow'
    });

    if(!response.ok) {
        return {
            errors: {
                quantity: 'false'
            }
        }
    }
    const data : {productId:number, quantity:number} = await response.json();
    return {
        success: {
            data: data
        }
    };
}

interface DeteleItemStatus {
    errors?: {
        token?: string;
        itemId?: boolean;
    },
    success?: boolean;

}

export async function delteItem(itemId: number) : Promise<DeteleItemStatus> {
    if (!token) {
        return {
            errors: {
                token: 'false'
            }
        }
    }
    const response = await fetch(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        return {
            errors: {
                itemId: false
            }
        }
    } else {
        return {
            success: true
        }
    }
}