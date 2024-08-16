export const StatusCodes = {
	// Informational responses
	CONTINUE: 100,
	SWITCHING_PROTOCOLS: 101,
	PROCESSING: 102,

	// Success responses
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NON_AUTHORITATIVE_INFORMATION: 203,
	NO_CONTENT: 204,
	RESET_CONTENT: 205,
	PARTIAL_CONTENT: 206,
	MULTI_STATUS: 207,

	// Redirection messages
	MULTIPLE_CHOICES: 300,
	MOVED_PERMANENTLY: 301,
	MOVED_TEMPORARILY: 302,
	SEE_OTHER: 303, // Server sent this response to directing client to get requested resource to another URI with a GET request.
	NOT_MODIFIED: 304, // This is used for caching purposes. It is telling to client that response has not been modified. So, client can continue to use same cached version of response.
	USE_PROXY: 305, // @deprecated Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.
	TEMPORARY_REDIRECT: 307, // Server sent this response to directing client to get requested resource to another URI with same method that used prior request. This has the same semantic than the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
	PERMANENT_REDIRECT: 308, // This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.

	// Client error responses
	BAD_REQUEST: 400, // This response means that server could not understand the request due to invalid syntax.
	UNAUTHORIZED: 401, // Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
	PAYMENT_REQUIRED: 402, // This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.
	FORBIDDEN: 403, // The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.
	NOT_FOUND: 404, // The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.
	METHOD_NOT_ALLOWED: 405, // The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.
	NOT_ACCEPTABLE: 406, // This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.
	PROXY_AUTHENTICATION_REQUIRED: 407, // This is similar to 401 but authentication is needed to be done by a proxy.
	REQUEST_TIMEOUT: 408, // This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.
	CONFLICT: 409, // This response is sent when a request conflicts with the current state of the server.
	GONE: 410, // This response would be sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
	LENGTH_REQUIRED: 411, // The server rejected the request because the Content-Length header field is not defined and the server requires it.
	PRECONDITION_FAILED: 412, // The client has indicated preconditions in its headers which the server does not meet.
	REQUEST_TOO_LONG: 413, // Request entity is larger than limits defined by server; the server might close the connection or return a Retry-After header field.
	REQUEST_URI_TOO_LONG: 414, // The URI requested by the client is longer than the server is willing to interpret.
	UNSUPPORTED_MEDIA_TYPE: 415, // The media format of the requested data is not supported by the server, so the server is rejecting the request.
	REQUESTED_RANGE_NOT_SATISFIABLE: 416, // The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is outside the size of the target URI's data.
	EXPECTATION_FAILED: 417, // This response code means the expectation indicated by the Expect request header field can't be met by the server.
	IM_A_TEAPOT: 418, // Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.
	INSUFFICIENT_SPACE_ON_RESOURCE: 419, // The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request which received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.
	METHOD_FAILURE: 420, // @deprecated A deprecated response used by the Spring Framework when a method has failed.
	MISDIRECTED_REQUEST: 421, // Defined in the specification of HTTP/2 to indicate that a server is not able to produce a response for the combination of scheme and authority that are included in the request URI.
	UNPROCESSABLE_ENTITY: 422, // The request was well-formed but was unable to be followed due to semantic errors.
	LOCKED: 423, // The resource that is being accessed is locked.
	FAILED_DEPENDENCY: 424, // The request failed due to failure of a previous request.
	PRECONDITION_REQUIRED: 428, // The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
	TOO_MANY_REQUESTS: 429, // The user has sent too many requests in a given amount of time ("rate limiting").
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431, // The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.
	UNAVAILABLE_FOR_LEGAL_REASONS: 451, // The user-agent requested a resource that cannot legally be provided, such as a web page censored by a government.

	// Server error responses
	INTERNAL_SERVER_ERROR: 500, // The server encountered an unexpected condition that prevented it from fulfilling the request.
	NOT_IMPLEMENTED: 501, // The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
	BAD_GATEWAY: 502, // This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
	SERVICE_UNAVAILABLE: 503, // The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.
	GATEWAY_TIMEOUT: 504, // This error response is given when the server is acting as a gateway and cannot get a response in time.
	HTTP_VERSION_NOT_SUPPORTED: 505, // The HTTP version used in the request is not supported by the server.
	INSUFFICIENT_STORAGE: 507, // The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
	NETWORK_AUTHENTICATION_REQUIRED: 511, // The 511 status code indicates that the client needs to authenticate to gain network access.
};
