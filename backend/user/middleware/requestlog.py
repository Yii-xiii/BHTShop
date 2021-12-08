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
		# print(urlopen(response).read())
		# print(request.path)
		# print(re.search("^(/admin/)",request.path))
		if re.search("^(/admin/)",request.path):
			logger.info('{} : "{} {}" {}'.format(request.user, request.method, request.path, response.status_code))
		elif request.path == "/users/login/":
			logger.info('{} : "{} {} , {}" {}'.format(request.user, request.method, request.path, dict(username=json.loads(request.body)["username"]), response.status_code))
		elif request.body is not None and len(request.body) != 0:
			logger.info('{} : "{} {} , {}" {}'.format(request.user, request.method, request.path, json.loads(request.body), response.status_code))
		else:
			logger.info('{} : "{} {}" {}'.format(request.user, request.method, request.path, response.status_code))
		return response