const catchAsyncError=(func)=>{
	return (req,res,next)=>{
		Promise.resolve(func(req,res,next)).catch((err)=>{
			console.log(err);
			next(err)});
	}
}

module.exports=catchAsyncError;