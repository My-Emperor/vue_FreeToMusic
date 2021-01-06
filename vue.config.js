module.exports = {
    configureWebpack: {
        resolve: {
            // 后缀 在webpack中有配置
            // extensions:[]
            alias: {
                // '@':'src'
                assets: "@/assets",
                common: "@/common",
                components: "@/components",
                network: "@/network",
                views: "@/views",
                plugins: "@/plugins"
            }
        }
    }
};