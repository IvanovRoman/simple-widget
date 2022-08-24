module.exports = function(env) {
    var path = require('path');
    var webpack = require('webpack');
    var CircularDependencyPlugin = require('circular-dependency-plugin');
    var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
    var MiniCssExtractPlugin = require('mini-css-extract-plugin');
  
    var prod = env && env.prod;
    var useScss = [
      {
        loader: 'css-loader',
        options: {
          import: false,
          url: false
        }
      },
      'postcss-loader',
      'sass-loader'
    ];  
    var config = {
      entry: ['./src/WRDSWidget.tsx',
      ],
  
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'WRDSWidget.js',
        library: 'WRDSWidget',
        libraryTarget: 'window',
      },
      optimization: {
        minimize: false,
        usedExports: true, // <- remove unused function
      },
      target: 'web',
      mode: 'production',
      devtool: prod ? false : 'cheap-module-source-map',
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: [path.resolve('./src'),'node_modules']
      },
  
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json',
                        transpileOnly: true
                    }
                }
            ]
          },
          {
            test: /\.ttf$/,
            type: 'asset',
          },
          {
            test: /\.scss$/,
            include: /entry/,
            use: prod ?
              [MiniCssExtractPlugin.loader, ...useScss] :
              ['style-loader', ...useScss]
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.svg$/,
            use: 'null-loader'
          }
        ]
      },
  
      plugins: [
        new ForkTsCheckerWebpackPlugin(),
        // avoid emitting files when an error occurs
        new webpack.NoEmitOnErrorsPlugin(),
        new CircularDependencyPlugin({
          exclude: /node_modules/,
          failOnError: true
        }),
        new webpack.HotModuleReplacementPlugin()
      ]
    };
  
    if (prod) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].css'
        })
      );
    }
  
    return config;
  };
  