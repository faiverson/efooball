<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tg:send
                            {message : The message we want to send}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a message';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $msg = $this->argument('message');
        $telegram = app('telegram.bot');
        $response = $telegram->sendMessage([
            'chat_id' => env('TELEGRAM_CHAT_ID'),
            'text' => $msg,
        ]);
        return Command::SUCCESS;
    }
}
