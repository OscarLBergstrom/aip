import HaipModel from "../src/models/model";

describe("HaipModel", () => {
  let model: HaipModel;

  beforeEach(() => {
    model = new HaipModel();
  });

  it("should format bot response correctly", () => {
    const botMessage = "1. Song1 - Artist1\n2. Song2 - Artist2";
    model.formatBotResponse(botMessage);

    expect(model.tracks).toEqual([
      { title: "Song1", artist: "Artist1" },
      { title: "Song2", artist: "Artist2" },
    ]);
  });

  it("should set playlist name correctly", () => {
    const playlistName = "test playlist name";
    model.setPlaylistName(playlistName);
    expect(model.playlistName).toEqual(playlistName);
  });

  it("should logout correctly", () => {
    model.loggedIn = true;
    model.user.code = "test";
    model.user.token = "test";
    model.user.email = "test";
    model.user.username = "test";
    model.user.id = "test";
    model.logout();
    expect(model.loggedIn).toEqual(false);
    expect(model.user.id).toEqual("");
  });

  it("should select playlist correctly", () => {
    const testID = "1234";
    model.selectPlaylist(testID);
    expect(model.playlistID).toEqual(testID);
  });
});
