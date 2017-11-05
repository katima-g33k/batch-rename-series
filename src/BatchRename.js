import fs from 'fs';

import config from '../config/config.json';
import Logger from './Logger';
import Series from './Series';
import TVDB from './TVDB';

export default class BatchRename {
  constructor() {
    this.logger = new Logger(this.constructor.name);
  }

  async getSeriesInfo(seriesName) {
    const theTvDb = new TVDB(config.thetvdb.token);

    try {
      const series = new Series(await theTvDb.getSeries(seriesName));
      series.setEpisodeList(await theTvDb.getEpisodeList(series.id));
      return series;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  createSeasonFolders() {
    this.series.episodeList.seasonList.forEach((season) => {
      const seasonDir = `${this.path}/Season ${season}`;

      if (!fs.existsSync(seasonDir)) {
        this.logger.info(`Creating directory ${seasonDir}`);
        fs.mkdirSync(seasonDir);
      }
    });
  }

  renameFile(file) {
    const match = file.match(/s(\d+).*e(\d+)/i);

    if (match) {
      const { 1: season, 2: episodeNumber } = match;
      const source = `${this.path}/${file}`;
      const destination = this.getDestination(file, +season, +episodeNumber);

      this.logger.info(`Renaming file from ${source} to ${destination}`);
      fs.renameSync(source, destination);
    }
  }

  getDestination(file, season, episodeNumber) {
    const episodeList = this.series.episodeList.getSeason(season);
    const episode = episodeList.find(e => e.number === episodeNumber);
    const ext = file.match(/\.\w+$/)[0];
    return `${this.path}/Season ${season}/${episode}${ext}`;
  }

  execute(dir) {
    this.logger.info(`Reading ${dir} directory`);
    fs.readdirSync(dir).forEach(async (seriesName) => {
      this.path = `${dir}/${seriesName}`;

      this.logger.info(`Getting information for ${seriesName} on theTVDB`);
      this.series = await this.getSeriesInfo(seriesName);
      this.createSeasonFolders();

      this.logger.info(`Reading ${this.path} directory`);
      fs.readdirSync(this.path).forEach(this.renameFile);

      this.logger.info(`Completed renaming files for ${seriesName}`);
    });

    this.logger.info('Batch rename complete');
  }
}
