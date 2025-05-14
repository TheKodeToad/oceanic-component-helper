/**
 * MIT License
 *
 * Copyright (c) 2023 Donovan Daniels
 * Copyright (c) 2025 TheKodeToad
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { readFileSync } from "fs";
import { actionRow, container, file, mediaGallery, mediaGalleryItem, paragraphTextInput, section, selectOption, separator, shortTextInput, stringSelectMenu, textButton, textDisplay, thumbnail } from "oceanic-component-helper";
import { ApplicationCommandTypes, ButtonStyles, Client, ComponentTypes, InteractionTypes, MessageFlags, SeparatorSpacingSize } from "oceanic.js";

const client = new Client({
    auth: "Bot [TOKEN]",
    gateway: {
        intents: [] // interactions need no intents
    }
});

const GUILD_ID = "";
client.on("ready", async() => {
    console.log("Ready as", client.user.tag);

    await client.application.bulkEditGuildCommands(GUILD_ID, [
        {
            type: ApplicationCommandTypes.CHAT_INPUT,
            name: "test",
            description: "Test"
        }
    ]);
});

client.on("interactionCreate", async interaction => {
    if (interaction.type === InteractionTypes.APPLICATION_COMMAND) {
        if (interaction.data.name === "test") {
            return interaction.createModal({
                customID: "modal",
                title: "Survey",
                components: [
                    shortTextInput("What's your favourite food?", "food", { minLength: 3 }),
                    paragraphTextInput("Why?", "why", { minLength: 20 }),
                ]
            })
        }
    }
});

// An error handler
client.on("error", (error) => {
    console.error("Something went wrong:", error);
});

// Connect to Discord
client.connect();