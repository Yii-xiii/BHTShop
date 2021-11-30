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
	getProductList = () => {
		let data = this.get(`/products/`);
		return data["data"];
	}

	getProductListByPage = (pageNum) => { 
		//10 per page
		let data = this.get(`/products/pages/${pageNum}`);
		return data;
	}

	getLastestProductListByPageNum = (pageNum) => { 
		//10 per page
		let data = this.get(`/products/latest/pages/${pageNum}`);
		return data;
	}

	getProduct = (id) => {
		//404 : product not found
		let data = this.get(`/products/${id}/`);
		return data;
	}

	createProduct = (title, description) => {
		//login required
		//403 : user is not a seller
		let data = this.post(`/products/create/`,{title, description});
		return data;
	}

	updateProduct = (id,title, description) => {
		//login required
		//404 : product not found
		//403 : user is not a seller
		let data = this.put(`/products/${id}/edit/`,{title, description});
		return data;
	}

	deleteProduct = (id) => {
		//login required
		//404 : product not found
		//403 : user is not a seller
		let data = this.delete(`/products/${id}/edit/`);
		return data;
	}

	//ProductSpec CRUD
	getProductSpecList = (productId) => {
		let data = this.get(`/products/${productId}/specs`);
		return data;
	}

	getProductSpecListByPageNum = (productId,pageNum) => { //10 per page
		let data = this.get(`/products/${productId}/specs/pages/${pageNum}`);
		return data;
	}

	getLastestProductSpecListByPageNum = (productId,pageNum) => { //10 per page
		let data = this.get(`/products/${productId}/specs/latest/pages/${pageNum}`);
		return data;
	}

	getProductSpec = (productId,specId) => {
		//404 : product spec not found
		let data = this.get(`/products/${productId}/specs/${specId}/`);
		return data;
	}

	createProductSpec = (productId, description, price, stock) => {
		//login required
		//404 : product not found
		//403 : user is not a seller
		let data = this.post(`/products/${productId}/specs/create/`,{description, price, stock});
		return data;
	}

	updateProductSpec = (productId, specId, description, price, stock) => {
		//login required
		//404 : product spec not found
		//403 : user is not a seller
		let data = this.put(`/products/${productId}/specs/${specId}/edit/`,{description, price, stock});
		return data;
	}

	deleteProductSpec = (productId, specId) => {
		//login required
		//404 : product spec not found
		//403 : user is not a seller
		let data = this.delete(`/products/${productId}/specs/${specId}/edit/`);
		return data;
	}


	//ProductImage CRUD
	getProductImageList = (productId) => {
		let data = this.get(`/products/${productId}/images`);
		return data;
	}

	getProductImage = (productId,imageId) => {
		//404 : product image not found
		let data = this.get(`/products/${productId}/images/${imageId}/`);
		return data;
	}

	createProductImage = (productId, form) => {
		//login required
		//404 : product not found
		//403 : user is not a seller
		let data = this.post(`/products/${productId}/images/create/`,{form});
		return data;
	}

	updateProductImage = (productId, imageId, form) => {
		//login required
		//404 : product image not found
		//403 : user is not a seller
		let data = this.put(`/products/${productId}/images/${imageId}/edit/`,{form});
		return data;
	}

	deleteProductImage = (productId, imageId) => {
		//login required
		//404 : product image not found
		//403 : user is not a seller
		let data = this.delete(`/products/${productId}/images/${imageId}/edit/`);
		return data;
	}

	//Customer CRUD
	getCustomer = (id) => {
		//404 : customer not found
		let data = this.get(`/users/customers/${id}/`);
		return data;
	}

	createCustomer = (username, password, phoneNumber, address) => {
		let data = this.post(`/users/customers/create/`,{username, password, phoneNumber, address});
		return data;
	}

	updateCustomer = (id,username, password, phoneNumber, address) => {
		//login required
		//404 : customer not found
		//403 : editing other customer info
		let data = this.put(`/users/customers/${id}/edit`,{username, password, phoneNumber, address});
		return data;
	}

	deleteCustomer = (id) => {
		//login required
		//404 : customer not found
		//403 : editing other customer info
		let data = this.delete(`/users/customers/${id}/edit`);
		return data;
	}

	//Seller CRUD
	getSeller = (id) => {
		//404 : seller not found
		let data = this.get(`/users/sellers/${id}/`);
		return data;
	}

	createSeller = (username, password, phoneNumber, address) => {
		let data = this.post(`/users/sellers/create/`,{username, password, phoneNumber, address});
		return data;
	}

	updateSeller = (id,username, password, phoneNumber, address) => {
		//login required
		//404 : seller not found
		//403 : editing other seller info
		let data = this.put(`/users/sellers/${id}/edit/`,{username, password, phoneNumber, address});
		return data;
	}

	deleteSeller = (id) => {
		//login required
		//404 : seller not found
		//403 : editing other seller info
		let data = this.delete(`/users/sellers/${id}/edit/`);
		return data;
	}

	//login logout
	login = (username, password) => {
		//403 : wrong username or password
		let data = this.post(`users/login`, {username, password});
		if (data["errorCode"] != 403) {
			const cookies = data["cookies"]
			Cookies.set("user",cookies["user"])
			Cookies.set("username",cookies["username"])
		}
		return data;
	}

	logout = () => {
		//403 : user is not logged in
		let data = this.post(`users/logout`);
		if (data["errorCode"] != 403) {
			Cookies.remove("user")
			Cookies.remove("username")
		}
		return data;
	}
}

const api = new Api()

export default api;