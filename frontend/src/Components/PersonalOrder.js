import React from 'react'

const PersonalOrder = ({ order }) => {
    return (
        <div>
            Item: {order.productSpec.product.title}
            Paid: {order.totalPrice}
        </div>
    )
}

export default PersonalOrder
