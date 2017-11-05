export default class Episode {
  constructor(episode) {
    this.absoluteNumber = episode.absoluteNumber;
    this.name = episode.episodeName;
    this.number = episode.airedEpisodeNumber;
    this.season = episode.airedSeason;
  }

  toString() {
    const name = this.name.replace(/[?!:;~%&,]/g, '');
    return `${this.number < 10 ? '0' : ''}${this.number} - ${name}`;
  }
}
