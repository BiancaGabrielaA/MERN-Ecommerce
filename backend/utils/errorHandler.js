class ErrorHandler extends Error {

    constructor(message, statusCode) {
       super(message)
       this.statusCode = statusCode;

       ///Create stack property 
       /// If you don’t use it, the stack trace might include internal lines from your custom error 
       // class constructor, which makes debugging noisy and less useful.
       Error.captureStackTrace(this, this.constructor); ///Error.captureStackTrace(targetObject, constructorOpt)
    }
}

export default ErrorHandler;