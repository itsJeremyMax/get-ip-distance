/* eslint-disable import/order */
import axios from 'axios';

import { Coords } from '../types/Coords';
import { IPInfo } from '../types/IPInfo';
import { calcCrow } from './calcCrow';

export async function ipLookup(address: string) {
  const ipInfo: Promise<IPInfo> = await (
    await axios.get(`https://ipinfo.io/${address}`)
  ).data;
  return ipInfo;
}

export async function getIpDistance(a: string, b: string): Promise<number> {
  const ipA: Promise<IPInfo> = ipLookup(a);

  const ipB: Promise<IPInfo> = ipLookup(b);

  const res = await Promise.all([ipA, ipB]);

  const coords: readonly Coords[] = res.map((location): Coords => {
    const [lat, long] = (location.loc as string).split(',');

    return {
      lat,
      long,
    };
  });

  const distance = calcCrow(
    +coords[0].lat,
    +coords[0].long,
    +coords[1].lat,
    +coords[1].long
  );

  return distance;
}
