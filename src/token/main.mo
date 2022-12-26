import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

actor Token {
    
    var owner: Principal = Principal.fromText("5egea-xer2k-yvk5m-brzr5-zqwpx-xwwtf-rwcvf-gwwwg-yiljp-hh7lr-3qe");
    var totalSupply: Nat = 1000000000;
    var symbol: Text = "GP7";

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal): async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        
        return balance;
    };

    public query func getSymbol(): async Text {
        return symbol;
    };

    public shared(msg) func payOut(): async Text {
        Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            balances.put(msg.caller, amount);
            return "Success!";    
        } else {
            return "Already Claimed!";
        }
    };

}