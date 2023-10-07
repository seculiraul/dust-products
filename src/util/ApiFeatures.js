class ApiFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    let obj = { ...this.queryString }
    const excluded = ['sort', 'page', 'limit', 'search']
    const newQuery = excluded.forEach((el) => delete obj[el])

    this.modifyQuery(obj)

    if (this.queryString.search) {
      obj.name = { $regex: this.queryString.search, $options: 'i' }
    }

    this.query = this.query.find(obj)

    return this
  }

  sort() {
    if (this.queryString.sort) {
      const [sortBy, order] = this.queryString.sort?.split('-')

      this.query = this.query.sort({ [sortBy]: order })
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
    Object.keys(obj).forEach((key) => (obj[key] = obj[key]?.split(',')))
    if (obj.size) {
      const { size } = obj
      obj.sizes = { $elemMatch: { size, quantity: { $gt: 0 } } }
      delete obj.size
    }
    return obj
  }
}

module.exports = ApiFeatures
