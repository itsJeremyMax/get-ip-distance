A basic library that uses the Haversine formula to calculate the distance (in km) between two ip addresses.

Example
```
import { getIpDistance } from './lib/';

getIpDistance('1.1.1.1', '1.1.2.2').then(console.log);
```