import fetch from './fetch';
import Logger from './Logger';

export default class TVDB {
  constructor(token) {
    this.logger = new Logger(this.constructor.name);
    this.apiUrl = 'https://api.thetvdb.com';
    this.token = token;
  }

  async getSeries(name) {
    const options = {
      method: 'GET',
      query: { name },
      url: `${this.apiUrl}/search/series`,
    };

    try {
      const series = (await fetch(options, this.token)).data[0];
      return series;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  async getEpisodeList(id, page = 1) {
    const options = {
      method: 'GET',
      url: `${this.apiUrl}/series/${id}/episodes/query`,
      query: {
        page,
      },
    };

    try {
      const { data, links } = await fetch(options, this.token);

      if (links.next) {
        const nextPage = await this.getEpisodeList(id, links.next);
        return data.concat(nextPage);
      }

      return data;
    } catch (err) {
      this.logger.error(err);
      return [];
    }
  }
}
