class ApiFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    let obj = { ...this.queryString }
    const excluded = ['sort', 'page', 'limit']
    const newQuery = excluded.forEach((el) => delete obj[el])
    this.modifyQuery(obj)
    console.log(obj)
    this.query = this.query.find(obj)

    return this
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('bestSelling')
    }

    return this
  }

  paginate() {
    const page = +this.queryString.page ?? 1
    const limitFields = +this.queryString.limit ?? +process.env.LIMIT_FIELDS
    const skip = (page - 1) * limitFields

    this.query = this.query.skip(skip).limit(limitFields)

    return this
  }

  modifyQuery(obj) {
    for (const property in obj) {
      obj[property] = obj[property].split(',')
    }
    return obj
  }
}

module.exports = ApiFeatures
