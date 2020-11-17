import { Client, ClientOptions } from "discord.js";

/** options to pass into {@link Blazey} */
export interface BlazeyOpts extends ClientOptions {
   token: string;
}

/**
 * the main client that you want to use
 */
export class Blazey {
   private readonly _bot: Client;
   private readonly opts: BlazeyOpts;

   private started: boolean = false;
   private stopped: boolean = false;

   public constructor(opts: BlazeyOpts) {
      this.opts = opts;

      this._bot = new Client(opts);
   }

   public async start(): Promise<void> {
      if (this.started) return;
      await this._bot.login(this.opts.token);
      this.started = true;
   }

   public stop(): void {
      if (this.stopped) return;
      this._bot.destroy();
      this.stopped = true;
   }
}
