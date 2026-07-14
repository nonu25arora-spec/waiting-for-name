import Time "mo:core/Time";

module {
  public type Timestamp = Int;

  public func now() : Timestamp {
    Time.now();
  };
};
