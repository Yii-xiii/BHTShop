import axios from "axios";
import Cookies from "js-cookie"

class Api {
	async post(path, item) {
		try {
			const res = await axios.post(path,item);
			const res_data = await res.data;
			//console.log(res.data);
			return res_data;
		} catch (err) {
			console.log(err);
		}

	}

	async put(path, item) {
		try {
			const res = await axios.post(path,item);
			const res_data = await res.data;
			//console.log(res.data);
			return res_data;
		} catch (err) {
			console.log(err);
		}

	}

	async delete(path) {
		try {
			const res = await axios.delete(path);
			const res_data = await res.data;
			//console.log(res.data);
			return res_data;
		} catch (err) {
			console.log(err);
		}
  	}

	async get(path) {
		try {
			const res = await axios.get(path);
			const res_data = await res.data;
			return res_data;
		} catch (err) {
			console.log(err);
		}
	}	

	//Product CRUD
	getProductList = async () => {
		let data = await this.get(`/products/`);
		return data;
	}

	getBestSellingProductList = async () => {
		let data = await this.get(`/products/best_selling/`);
		console.log(data)
		return data;
	}

	getSellerLatestProductList = async () => {
		//login required
		let data = await this.get(`/products/sellers/best_selling/`);
		return data;
	}

	getSellerBestSellingProductList = async () => {
		//login required
		let data = await this.get(`/products/sellers/best_selling/`);
		return data;
	}

	getProductListByPage = async (pageNum) => { 
		//10 per page
		let data = await this.get(`/products/pages/${pageNum}/`);
		return data;
	}

	getLastestProductListByPageNum = async (pageNum) => { 
		//10 per page
		let data = await this.get(`/products/latest/pages/${pageNum}/`);
		return data;
	}

	getProduct = async (id) => {
		//404 : product not found
		let data = await this.get(`/products/${id}/`);
		return data;
	}

	createProduct = async (title, description, category) => {
		//login required
		//403 : user is not a seller
		let data = await this.post(`/products/create/`,{title, description, category});
		return data;
	}

	updateProduct = async (id,title, description,category) => {
		//login required
		//404 : product not found
		//403 : user is not a seller
		let data = await this.put(`/products/${id}/edit/`,{title, description,category});
		return data;
	}

	deleteProduct = async (id) => {
		//login required
		//404 : product not found
		//403 : user is not a seller
		let data = await this.delete(`/products/${id}/edit/`);
		return data;
	}

	//ProductSpec CRUD
	getProductSpecList = async (productId) => {
		let data = await this.get(`/products/${productId}/specs/`);
		return data;
	}

	getProductSpecListByPageNum = async (productId,pageNum) => { //10 per page
		let data = await this.get(`/products/${productId}/specs/pages/${pageNum}/`);
		return data;
	}

	getLastestProductSpecListByPageNum = async (productId,pageNum) => { //10 per page
		let data = await this.get(`/products/${productId}/specs/latest/pages/${pageNum}/`);
		return data;
	}

	getProductSpec = async (productId,specId) => {
		//404 : product spec not found
		let data = await this.get(`/products/${productId}/specs/${specId}/`);
		return data;
	}

	createProductSpec = async (productId, description, price, stock) => {
		//login required
		//404 : product not found
		//403 : user is not a seller
		let data = await this.post(`/products/${productId}/specs/create/`,{description, price, stock});
		return data;
	}

	updateProductSpec = async (productId, specId, description, price, stock) => {
		//login required
		//404 : product spec not found
		//403 : user is not a seller
		let data = await this.put(`/products/${productId}/specs/${specId}/edit/`,{description, price, stock});
		return data;
	}

	deleteProductSpec = async (productId, specId) => {
		//login required
		//404 : product spec not found
		//403 : user is not a seller
		let data = await this.delete(`/products/${productId}/specs/${specId}/edit/`);
		return data;
	}


	//ProductImage CRUD
	getProductImageList = async (productId) => {
		let data = await this.get(`/products/${productId}/images/`);
		return data;
	}

	getProductImage = async (productId,imageId) => {
		//404 : product image not found
		let data = await this.get(`/products/${productId}/images/${imageId}/`);
		return data;
	}

	getFirstProductImage = async (productId) => {
		//404 : product not found
		let data = await this.get(`/products/${productId}/images/first/`);
		return data;
	}

	createProductImage = async (productId, form) => {
		//login required
		//404 : product not found
		//403 : user is not a seller
		// let data = await this.post(`/products/${productId}/images/create/`,{form});

		let data = await axios({
            method: 'post',
            url: `/products/${productId}/images/create/`,
            data: form
        })

		return data;
	}

	// updateProductImage = async (productId, imageId, form) => {
	// 	//login required
	// 	//404 : product image not found
	// 	//403 : user is not a seller
	// 	let data = await this.put(`/products/${productId}/images/${imageId}/edit/`,{form});
	// 	return data;
	// }

	deleteProductImage = async (productId, imageId) => {
		//login required
		//404 : product image not found
		//403 : user is not a seller
		let data = await this.delete(`/products/${productId}/images/${imageId}/edit/`);
		return data;
	}

	//Product Comment CRUD
	getProductCommentList = async (productId) => {
		//404 : product not found
		let data = await this.get(`comments/products/${productId}/`);
		return data;
	}

	getProductCommentListByPage = async (productId,pageNum) => {
		//404 : product not found
		let data = await this.get(`comments/products/${productId}/pages/${pageNum}/`);
		return data;
	}

	getLatestProductCommentList = async (productId) => {
		//404 : product not found
		let data = await this.get(`comments/products/${productId}/latest/`);
		return data;
	}

	getLatestProductCommentListByPage = async (productId,pageNum) => {
		//404 : product not found
		let data = await this.get(`comments/products/${productId}/latest/pages/${pageNum}/`);
		return data;
	}

	getOrderComment = async (orderId) => {
		//404 : order not found
		let data = await this.get(`comments/orders/${orderId}/`);
		return data;
	}

	getProductComment = async (commentId) => {
		//404 : comment not found
		let data = await this.get(`comments/${commentId}/`);
		return data;
	}

	createProductComment = async (orderId, description, rating) => {
		//login required
		//404 : order not found
		//403 : user is not a customer or not order.customer
		//400 : customer had alrdy left a comment for this order
		let data = await this.post(`comments/orders/${orderId}/create/`,{description, rating});
		return data;
	}

	updateProductComment = async (commentId, description, rating) => {
		//login required
		//404 : comment not found
		//403 : user is not a comment.order.customer
		let data = await this.put(`comments/${commentId}/edit/`,{description, rating});
		return data;
	}

	deleteProductComment = async (commentId) => {
		//login required
		//404 : comment not found
		//403 : user is not a comment.order.customer
		let data = await this.delete(`comments/${commentId}/edit/`);
		return data;
	}


	//Customer Collection CRUD
	getCustomerCollectionList = async () => {
		//login required
		//403 : user is not customer
		let data = await this.get(`collections/`);
		return data;
	}

	getLatestCustomerCollectionList = async () => {
		//login required
		//403 : user is not customer
		let data = await this.get(`collections/latest/`);
		return data;
	}

	getLatestCustomerCollectionListByPage = async (pageNum) => {
		//login required
		//403 : user is not customer
		let data = await this.get(`collections/latest/pages/${pageNum}/`);
		return data;
	}

	getCustomerCollection = async (productId) => {
		//login required
		//403 : user is not collection.customer
		//404 : collection not found
		let data = await this.get(`collections/products/${productId}/`);
		return data;
	}

	createCustomerCollection = async (productId) => {
		//login required
		//403 : user is not customer
		//404 : product not found
		let data = await this.post(`collections/create/`,{productId});
		return data;
	}

	deleteCustomerCollection = async (productId) => {
		//login required
		//403 : user is not collection.customer
		//404 : collection not found
		let data = await this.delete(`collections/products/${productId}/edit/`);
		return data;
	}

	//Customer Followship CRUD
	getCustomerFollowshipList = async () => {
		//login required
		//403 : user is not customer
		let data = await this.get(`followships/`);
		return data;
	}

	getLatestCustomerFollowshipList = async () => {
		//login required
		//403 : user is not customer
		let data = await this.get(`followships/latest/`);
		return data;
	}

	getLatestCustomerFollowshipListByPage = async (pageNum) => {
		//login required
		//403 : user is not customer
		let data = await this.get(`followships/latest/pages/${pageNum}/`);
		return data;
	}

	getCustomerFollowship = async (sellerId) => {
		//login required
		//403 : user is not followship.customer
		//404 : followship not found
		let data = await this.get(`followships/sellers/${sellerId}/`);
		return data;
	}

	createCustomerFollowship = async (sellerId) => {
		//login required
		//403 : user is not customer
		//404 : seller not found
		let data = await this.post(`followships/create/`,{sellerId});
		return data;
	}

	deleteCustomerFollowship = async (sellerId) => {
		//login required
		//403 : user is not followship.customer
		//404 : followship not found
		let data = await this.delete(`followships/sellers/${sellerId}/edit/`);
		return data;
	}

	//Customer Cart CRUD
	getCustomerCartList = async () => {
		//login required
		//403 : user is not customer
		let data = await this.get(`carts/`);
		return data;
	}

	getLatestCustomerCartList = async () => {
		//login required
		//403 : user is not customer
		let data = await this.get(`carts/latest/`);
		return data;
	}

	getLatestCustomerCartListByPage = async (pageNum) => {
		//login required
		//403 : user is not customer
		let data = await this.get(`carts/latest/pages/${pageNum}/`);
		return data;
	}

	getCustomerCart = async (specId) => {
		//login required
		//403 : user is not cart.customer
		//404 : cart not found
		let data = await this.get(`carts/productSpecs/${specId}/`);
		return data;
	}

	createCustomerCart = async (specId) => {
		//login required
		//403 : user is not customer
		//404 : spec not found
		let data = await this.post(`carts/create/`,{specId});
		return data;
	}

	deleteCustomerCart = async (specId) => {
		//login required
		//403 : user is not cart.customer
		//404 : cart not found
		let data = await this.delete(`carts/productSpecs/${specId}/edit/`);
		return data;
	}

	//Order CRUD
	getProductOrderListByPage = async (productId,pageNum) => {
		let data = await this.get(`/orders/products/${productId}/pages/${pageNum}/`);
		return data;
	}

	getCustomerOrderListByPage = async (customerId,pageNum) => {
		let data = await this.get(`/orders/customers/${customerId}/pages/${pageNum}/`);
		return data;
	}

	getOrder = async (orderId) => {
		//login required
		//404 : order not found
		//403 : user is neither order.customer nor order.seller
		let data = await this.get(`/orders/${orderId}/`);
		return data;
	}

	createOrder = async (productId, quantity, totalPrice, address, phoneNumber) => {
		//login required
		//404 : product not found
		//403 : user is not a customer
		let data = await this.post(`/orders/create/`,{productId, quantity, totalPrice, address, phoneNumber});
		return data;
	}

	updateOrder = async (orderId, quantity, totalPrice, address, phoneNumber) => {
		//login required
		//404 : order not found
		//403 : user is not order.customer
		let data = await this.put(`/orders/${orderId}/edit/`,{quantity, totalPrice, address, phoneNumber});
		return data;
	}

	deleteOrder = async (orderId) => {
		//login required
		//404 : order not found
		//403 : user is not order.customer
		let data = await this.delete(`/orders/${orderId}/edit/`);
		return data;
	}

	//OrderStatus CRUD
	getLatestOrderStatusList = async (orderId) => {
		//404 : order not found
		let data = await this.get(`/orders/${orderId}/statuses/latest_list/`);
		return data;
	}

	getLatestOrderStatus = async (orderId) => {
		//404 : order not found
		let data = await this.get(`/orders/${orderId}/statuses/latest/`);
		return data;
	}

	getOrderStatus = async (orderId,statusId) => {
		//login required
		//404 : status not found
		let data = await this.get(`/orders/${orderId}/statuses/${statusId}/`);
		return data;
	}

	createOrderStatus = async (orderId,status, description) => {
		//login required
		//404 : order not found
		//403 : user is not a seller
		let data = await this.post(`/orders/${orderId}/statuses/create/`,{status, description});
		return data;
	}

	updateOrderStatus = async (orderId, statusId, status, description) => {
		//login required
		//404 : status not found
		//403 : user is not order.product.seller
		let data = await this.put(`/orders/${orderId}/statuses/${statusId}/edit/`,{status, description});
		return data;
	}

	deleteOrderStatus = async (orderId, statusId) => {
		//login required
		//404 : status not found
		//403 : user is not order.product.seller
		let data = await this.delete(`/orders/${orderId}/statuses/${statusId}/edit/`);
		return data;
	}

	//Customer CRUD
	getCustomer = async (id) => {
		//404 : customer not found
		let data = await this.get(`/users/customers/${id}/`);
		return data;
	}

	createCustomer = async (username, password, phoneNumber, address) => {
		let data = await this.post(`/users/customers/create/`,{username, password, phoneNumber, address});
		return data;
	}

	updateCustomer = async (id,username, password, phoneNumber, address) => {
		//login required
		//404 : customer not found
		//403 : editing other customer info
		let data = await this.put(`/users/customers/${id}/edit/`,{username, password, phoneNumber, address});
		return data;
	}

	deleteCustomer = async (id) => {
		//login required
		//404 : customer not found
		//403 : editing other customer info
		let data = await this.delete(`/users/customers/${id}/edit/`);
		return data;
	}

	//Seller CRUD
	getSeller = async (id) => {
		//404 : seller not found
		let data = await this.get(`/users/sellers/${id}/`);
		return data;
	}

	createSeller = async (username, password, phoneNumber, address) => {
		let data = await this.post(`/users/sellers/create/`,{username, password, phoneNumber, address});
		return data;
	}

	updateSeller = async (id,username, password, phoneNumber, address) => {
		//login required
		//404 : seller not found
		//403 : editing other seller info
		let data = await this.put(`/users/sellers/${id}/edit/`,{username, password, phoneNumber, address});
		return data;
	}

	deleteSeller = async (id) => {
		//login required
		//404 : seller not found
		//403 : editing other seller info
		let data = await this.delete(`/users/sellers/${id}/edit/`);
		return data;
	}

	//login logout
	login = async (username, password) => {
		//403 : wrong username or password
		let data = await this.post(`/users/login/`, {username, password});

		if (data["errorCode"] !== 403) {
			const cookies = data["cookies"]
			Cookies.set("user",cookies["user"])
			Cookies.set("username",cookies["username"])
			Cookies.set("user_id",cookies["user_id"])
		}

		return data;
	}

	logout = async () => {
		//403 : user is not logged in
		let data = await this.post(`/users/logout/`);
		if (data["errorCode"] !== 403) {
			Cookies.remove("user")
			Cookies.remove("username")
			Cookies.remove("user_id")
		}
		return data;
	}
}

const api = new Api()

export default api;