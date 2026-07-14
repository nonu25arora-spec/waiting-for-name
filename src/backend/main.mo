import Map "mo:core/Map";
import LeadTypes "types/lead";
import LeadApi "mixins/lead-api";

actor {
  let leads : Map.Map<Nat, LeadTypes.Lead>;
  let state : { var nextLeadId : Nat };

  include LeadApi(leads, state);
};

