import Episode from './Episode';

const formatEpisodeList = list => list.reduce((acc, cur) => {
  const episodes = acc;
  const episode = new Episode(cur);

  if (acc[episode.season]) {
    episodes[episode.season].push(episode);
  } else {
    episodes[episode.season] = [episode];
  }

  return episodes;
}, {});

export default class EpisodeList {
  constructor(list = []) {
    this.episodes = formatEpisodeList(list);
  }

  getList() {
    return this.episodes;
  }

  getSeason(season) {
    return this.episodes[season] || [];
  }

  get specials() {
    return this.episodes[0];
  }

  get seasonList() {
    return Object.keys(this.episodes).filter(season => +season);
  }
}
