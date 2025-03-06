import create, { State } from "zustand";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
// LAMPORTS_PER_SOL is used to calculate the per decimal value

interface UserSOLBalanceStore extends State {
  balance: number;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => void;
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set, _get) => ({
  balance: 0,
  getUserSOLBalance: async (publicKey, connection) => {
    let balance = 0;

    try {
      balance = await connection.getBalance(publicKey, "confirmed");
      balance = balance / LAMPORTS_PER_SOL; // Convert LAMPORTs to SOLs
    } catch (error) {
      console.log(error);
    }

    set((s) => {
      s.balance = balance;
      console.log("💲 Balance : ", balance);
    });
  },
}));

export default useUserSOLBalanceStore;
