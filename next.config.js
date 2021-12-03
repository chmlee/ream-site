module.exports = {
    reactStrictMode: true,
    webpack: (config, {buildId, dev, isServer, defaultLoader, webpack}) => {
        config.module.rules.push({
            test: /\.ream$/,
            type: 'asset/source',
            //parser: {
            //    dataUrlCondition: (source, { file, module }) => {
            //        const content = source.toString();
            //        return content.includes('raw')
            //    }
            //}
        })
        return config
    } 
}
