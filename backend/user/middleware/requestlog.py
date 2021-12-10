from django.utils.deprecation import MiddlewareMixin
import logging
import json
import re

logger = logging.getLogger("test")

class RequestIdMiddleware(MiddlewareMixin):
	# def process_request(self, request):
		# print(request.META.get("REMOTE_ADDR"))
		# worker_local.request_id = request.META.get('REQUEST_ID', create_unique_id())
		# pass

	def process_response(self, request, response):
		# print(response.headers)
		# print(request.path)
		# print(re.search("^(/admin/)",request.path))
		if request.method == "POST":
			logger.info('{} : "{} {}" response_code:{}'.format(request.user, request.method, request.path, response.status_code))
		elif re.search("^(/admin/)",request.path):
			logger.info('{} : "{} {}" response_code:{}'.format(request.user, request.method, request.path, response.status_code))
		elif request.path == "/users/login/":			
			if response.headers["Content-Type"] == "application/json": 
				logger.info('{} : "{} {} , {}" response_code:{} return_code:{}'.format(request.user, request.method, request.path, dict(username=json.loads(request.body)["username"]), response.status_code, json.loads(response.content)["errorCode"]))
			else:
				logger.info('{} : "{} {} , {}" response_code:{}'.format(request.user, request.method, request.path, dict(username=json.loads(request.body)["username"]), response.status_code))
		elif request.body is not None and len(request.body) != 0:
			if response.headers["Content-Type"] == "application/json": 
				logger.info('{} : "{} {} , {}" response_code:{} return_code:{}'.format(request.user, request.method, request.path, json.loads(request.body), response.status_code, json.loads(response.content)["errorCode"]))
			else:
				logger.info('{} : "{} {} , {}" response_code:{}'.format(request.user, request.method, request.path, json.loads(request.body), response.status_code))
		else:
			if response.headers["Content-Type"] == "application/json": 
				logger.info('{} : "{} {}" response_code:{} return_code:{}'.format(request.user, request.method, request.path, response.status_code, json.loads(response.content)["errorCode"]))
			else:
				logger.info('{} : "{} {}" response_code:{}'.format(request.user, request.method, request.path, response.status_code))

		return response