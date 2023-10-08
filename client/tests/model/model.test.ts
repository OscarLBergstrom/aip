import HaipModel from '../../src/models/model';
import { useFetch } from '../../src/hooks/useFetch';
import { Track } from '../../src/assets/utils/types';

jest.mock("../../src/hooks/useFetch");

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

  it('should add an observer', () => {
    const observer = jest.fn();
    model.addObserver(observer);
    model.notifyObservers();
    expect(observer).toHaveBeenCalled();
  });

  it('should remove an observer', () => {
    model.addObserver(observer1);
    model.addObserver(observer2);

    model.removeObserver(observer1);
    model.notifyObservers();

    expect(observer1).not.toHaveBeenCalled(); // observer1 should not be called
    expect(observer2).toHaveBeenCalled(); // observer2 should still be called
  });

  it("should format bot response correctly", () => {
    const botMessage = "1. Song1 - Artist1\n2. Song2 - Artist2";
    model.formatBotResponse(botMessage);

    // Expect tracks to be populated correctly
    expect(model.tracks).toEqual([
      { title: "Song1", artist: "Artist1" },
      { title: "Song2", artist: "Artist2" },
    ]);
  });

  it('should create a playlist and update playlistID', async () => {
    const mockResponse = { token: { id: '123456' } };
    (useFetch as jest.Mock).mockResolvedValue(mockResponse);

    const playlistName = 'My Playlist';

    await model.createPlaylist(playlistName);

    expect(useFetch).toHaveBeenCalledWith({
      url: 'http://localhost:3001/api/playlist',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: model.user.token,
        userID: model.user.id,
        playlistName: playlistName,
      },
    });

    

    expect(model.playlistID).toBe(mockResponse.token.id);
  });

  it("should get track IDs for a list of tracks", async () => {
    // Mock the getSearchResult method
    const mockSearchResult = "spotify:track:123456";
    model.getSearchResult = jest.fn().mockResolvedValue(mockSearchResult);

    // Define a list of tracks
    const tracks: Track[] = [
      { title: "Song1", artist: "Artist1" },
      { title: "Song2", artist: "Artist2" },
    ];

    // Call the getTrackIDs method
    const trackIDs = await model.getTrackIDs(tracks);

    // Ensure that getSearchResult is called for each track
    expect(model.getSearchResult).toHaveBeenCalledTimes(tracks.length);

    // Verify that trackIDs contains the expected values
    expect(trackIDs).toEqual([mockSearchResult, mockSearchResult]);
  });

  


});
