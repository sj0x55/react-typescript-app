import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import ip from 'ip';
import { errorHandler, notFoundHandler } from './middlewares.mjs';
import { killPort, getCorsConfig, listenServer } from './utils.mjs';
import { loadData, saveData, fetchData, mergeData } from './data-loader.mjs';
(async () => {
  try {
    dotenv.config();

    const amazonBaseUrl = 'https://www.amazon.co.uk';
    const PORT = parseInt(process.env.PORT, 10) || 3005;
    const ipAddress = ip.address();
    const app = express();
    const corsConfig = getCorsConfig(ipAddress);
    const runAsyncWrapper = (callback) => {
      return (req, res, next) => {
        callback(req, res, next).catch(next);
      };
    };

    await killPort(PORT);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(corsConfig));

    app.get('/', (req, res) => {
      res.send('home');
    });

    app.get(
      '/data/:name',
      runAsyncWrapper(async (req, res) => {
        res.json(await loadData(req.params.name));
      }),
    );

    app.put(
      '/data/:name',
      runAsyncWrapper(async (req, res) => {
        const { name } = req.params;
        const pathUrls = [];
        const features = {};

        if (name === 'disks') {
          pathUrls.push(
            ...[
              '/hz/wishlist/ls/2KE9LBKCL3WBX?filter=unpurchased&sort=price-asc',
              '/hz/wishlist/ls/202GH96LTIUGX?filter=unpurchased&sort=price-asc',
              '/hz/wishlist/ls/3UTIRVZK6MNXU?filter=unpurchased&sort=price-asc',
              '/hz/wishlist/ls/B3BSCZ23IGZU?filter=unpurchased&sort=price-asc',
              '/hz/wishlist/ls/2CRH7UTBN1RW9?filter=unpurchased&sort=price-asc',
              '/hz/wishlist/ls/282MWNCIB5SRV?filter=unpurchased&sort=price-asc',
            ],
          );

          features.capacity = [/Capacity[\\n\s]+:[\\n\s]+(\d+)/i, Number];
        } else if (name === 'smartphones') {
          pathUrls.push(...['/hz/wishlist/genericItemsPage/P2ZKOL4X451E?filter=unpurchased&sort=price-asc']);

          features.size = /Size Name[\\n\s]+:[\\n\s]+(.+)/i;
          features.color = /Colour[\\n\s]+:[\\n\s]+(.+)/i;
        } else if (name === 'something') {
          pathUrls.push(
            ...[
              `/hz/wishlist/ls/2HMPV7AU1IQUH?filter=unpurchased&sort=price-asc`,
              `/hz/wishlist/ls/34AZXQ9DIXXUM?filter=unpurchased&sort=price-asc`,
              `/hz/wishlist/ls/1ZTW8TPP194QS?filter=unpurchased&sort=price-asc`,
            ],
          );
        }

        const data = mergeData(await loadData(name), await fetchData(amazonBaseUrl, pathUrls, features));

        saveData(name, data);
        res.json(data);
      }),
    );

    // Errors handling
    app.use(notFoundHandler);
    app.use(errorHandler);

    listenServer(app, PORT, () => {
      console.log(`Server listening at http://${ipAddress}:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
})();
