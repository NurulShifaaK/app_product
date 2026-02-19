class APIHelper{
    constructor(query,querystr){
        this.query=query,
        this.querystr=querystr
    }
        search(){
            const keyword=this.querystr.keyword?{
                name:{
                    $regex:this.querystr.keyword,
                    $options:"i",
                }
            }:{};

            this.query=this.query.find({...keyword});
            return this;
        }
        //http://localhost:3000/api/v1/products?keyword=samsun&catrgory=mobile&page=1&limit =5
        // filter(){
        //     const querycopy={...this.querystr};
        //     const removefields=["keyword","page","limit"];
        //     removefields.forEach((key)=>delete querycopy[key]);
        //     this.query=this.query.find(querycopy)
        //     return this;
        // }

        filter() {
  const querycopy = { ...this.querystr };

  const removefields = ["keyword", "page", "limit"];
  removefields.forEach((key) => delete querycopy[key]);

  // 🔥 REMOVE EMPTY VALUES
  Object.keys(querycopy).forEach((key) => {
    if (!querycopy[key] || querycopy[key] === "") {
      delete querycopy[key];
    }
  });

  this.query = this.query.find(querycopy);
  return this;
}



        pagination(){}
}

export default APIHelper;