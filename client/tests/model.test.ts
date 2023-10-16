import HaipModel from "../src/models/model";
import { useFetch } from "../src/hooks/useFetch";
import { Track } from "../src/utils/types";

jest.mock("../src/hooks/useFetch");

describe("HaipModel", () => {
  let model: HaipModel;
  let observer1: jest.Mock;
  let observer2: jest.Mock;

  beforeEach(() => {
    model = new HaipModel();
    observer1 = jest.fn();
    observer2 = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    model.observers = [];
  });

  // Observers

  it("should add an observer", () => {
    const observer = jest.fn();
    model.addObserver(observer);
    model.notifyObservers();
    expect(observer).toHaveBeenCalled();
  });

  it("should remove an observer", () => {
    model.addObserver(observer1);
    model.addObserver(observer2);

    model.removeObserver(observer1);
    model.notifyObservers();

    expect(observer1).not.toHaveBeenCalled(); // observer1 should not be called
    expect(observer2).toHaveBeenCalled(); // observer2 should still be called
  });

  // formatBotResponse()

  it("should format bot response correctly", () => {
    const botMessage = "1. Song1 - Artist1\n2. Song2 - Artist2";
    model.formatBotResponse(botMessage);

    expect(model.tracks).toEqual([
      { title: "Song1", artist: "Artist1" },
      { title: "Song2", artist: "Artist2" },
    ]);
  });

  // createPlaylist()

  it("should create a playlist and update playlistID", async () => {
    const mockResponse = { token: { id: "123456" } };
    (useFetch as jest.Mock).mockResolvedValue(mockResponse);

    const playlistName = "My Playlist";

    await model.createPlaylist(playlistName);

    expect(useFetch).toHaveBeenCalledWith({
      url: "http://localhost:3001/api/playlist",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        token: model.user.token,
        userID: model.user.id,
        playlistName: playlistName,
      },
    });

    expect(model.playlistID).toBe(mockResponse.token.id);
  });

  // getTrackIDs()

  it("should get track IDs for a list of tracks", async () => {
    const mockSearchResult = "spotify:track:123456";
    model.getSearchResult = jest.fn().mockResolvedValue(mockSearchResult);

    const tracks: Track[] = [
      { title: "Song1", artist: "Artist1" },
      { title: "Song2", artist: "Artist2" },
    ];

    const trackIDs = await model.getTrackIDs(tracks);

    expect(model.getSearchResult).toHaveBeenCalledTimes(tracks.length);

    expect(trackIDs).toEqual([mockSearchResult, mockSearchResult]);
  });

  // submitPlaylistRequest()

  it("should call getTrackIDs, createPlaylist, and addTracks", async () => {
    model.getTrackIDs = jest.fn();
    model.createPlaylist = jest.fn();
    model.addTracks = jest.fn();

    await model.submitPlaylistRequest();

    expect(model.getTrackIDs).toHaveBeenCalled();
    expect(model.createPlaylist).toHaveBeenCalled();
    expect(model.addTracks).toHaveBeenCalled();
  });

  // getUserDetails()

  it("getUserCode is called when this.user has not been logged in yet", async () => {
    model.getUserCode = jest.fn();

    await model.getUserDetails();

    expect(model.getUserCode).toHaveBeenCalled();
  });
});
