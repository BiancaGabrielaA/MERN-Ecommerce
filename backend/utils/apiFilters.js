class APIFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword, ///mongo operators with $
                $options: 'i' 
            }
        } 
        : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filters() {
        const queryCopy = { ...this.queryStr };
      
        // Remove fields that are not filters
        const fieldsToRemove = ['keyword'];
        fieldsToRemove.forEach((el) => delete queryCopy[el]);
      
        // Convert to MongoDB operators: gte -> $gte
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
      
        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
      }
}

export default APIFilters;