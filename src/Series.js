import EpisodeList from './EpisodeList';

export default class Series {
  constructor(series) {
    this.id = series.id;
    this.name = series.seriesName;
    this.description = series.overview;
    this.episodeList = new EpisodeList();
  }

  setEpisodeList(episodeList) {
    this.episodeList = new EpisodeList(episodeList);
  }
}
