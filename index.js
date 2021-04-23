const presetInfo = {
  strict: /('|")use\s+strict('|");?/gm
}

module.exports = class RemoveFileConentWebpackPlugin {
  /**
   * @constructor
   * @param {RegExp} exclude exclude files
   * @param {Array} extension file extension, '.js' by default
   */
  constructor({ exclude, extension, preset, match } = {}) {
    this.exclude = exclude
    this.extension = ['.js']
    if (extension && Array.isArray(extension) && extension.length) {
      this.extension.concat(extension)
    }
    this.preset = preset
    this.match = match || presetInfo[preset] || ''
  }

  apply(compiler) {
    const removeFileContent = (compilation) => {
      Object.keys(compilation.assets).forEach((filename) => {
        if (this.isMatchExtension(filename) && !this.isExclude(filename)) {
          const file = compilation.assets[filename]
          const origin = file.source().toString()
          const len = file.size()

          const removed = origin.replace(this.match, '')
          // need replace when origin content changed
          if (removed.length !== len) {
            const buff = Buffer.from(removed)
            compilation.assets[filename] = {
              source: () => {
                return buff
              },
              size: () => {
                return buff.length
              }
            }
          }
        }
      })
    }

    compiler.hooks.emit.tapAsync('WebpWebpackPlugin', (compilation, cb) => {
      const errors = []

      try {
        removeFileContent(compilation)
      } catch (err) {
        errors.push(err)
      }

      if (errors.length) {
        compilation.errors = compilation.errors.concat(errors)
      }
      cb()
    })
  }

  isMatchExtension(filename) {
    return !!this.extension.find((ext) => new RegExp(`\\${ext}$`).test(filename))
  }

  isExclude(filename) {
    return this.exclude ? this.exclude.test(filename) : false
  }
}
