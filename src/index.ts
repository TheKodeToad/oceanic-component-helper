

import type { ActionRowBase, ButtonStyles, ChannelSelectMenu, ChannelTypes, ClientEvents, Component, ComponentTypes, ContainerComponent, CreateMessageOptions, FileComponent, MediaGalleryComponent, MediaGalleryItem, MentionableSelectMenu, PremiumButton, RoleSelectMenu, SectionComponent, SelectOption, SeparatorComponent, SeparatorSpacingSize, StringSelectMenu, TextButton, TextDisplayComponent, TextInput, TextInputStyles, ThumbnailComponent, URLButton, UserSelectMenu } from "oceanic.js";

export type ActionRowProps = Omit<ActionRowBase<never>, "components" | "type">;

/**
 * Create an  {@link ComponentTypes.ACTION_ROW | ACTION_ROW} component.
 * @param items a list of message or modal components
 * @param props optional properties (id)
 * @returns an {@link ActionRowBase} object with item type inferred.
 */
export function ActionRow<T extends Component>(items: T[] = [], props?: ActionRowProps): ActionRowBase<T> {
	// enums are inlined so there are no runtime dependencies
	return { ...props, components: items, type: 1 };
}

export type TextButtonProps = Omit<TextButton, "label" | "customID" | "style" | "type"> & { style?: TextButton["style"] };

/**
 * Create a {@link ComponentTypes.BUTTON | BUTTON} component with a custom ID.
 * Clicks can be handled with {@link ClientEvents.interactionCreate}.
 * @param label text to display on the button
 * @param customID custom ID to handle interactions
 * @param props optional properties (disabled, emoji, id, style)
 * @returns a {@link TextButton} object
 */
export function TextButton(label: string, customID: string, props?: TextButtonProps): TextButton {
	return { ...props, label, customID, style: props?.style ?? 2 /* SECONDARY */, type: 2 };
}

export type URLButtonProps = Omit<URLButton, "label" | "url" | "style" | "type" >;

/**
 * Create a {@link ComponentTypes.BUTTON | BUTTON} component with the {@link ButtonStyles.LINK | LINK} style.
 * @param label text to display on the button
 * @param url URL to open on click
 * @param props optional properties (disabled, emoji, id)
 * @returns a {@link URLButton} object
 */
export function URLButton(label: string, url: string, props?: URLButtonProps): URLButton {
	return { ...props, label, url, style: 5, type: 2 };
}

export type PremiumButtonProps = Omit<PremiumButton, "skuID" | "style" | "type" >;

/**
 * Create a {@link ComponentTypes.BUTTON | BUTTON} component with the {@link ButtonStyles.PREMIUM | PREMIUM} style.
 * @param skuID identifier for a purchasable [SKU](https://discord.com/developers/docs/resources/sku)
 * @param props optional properties (disabled, id)
 * @returns a {@link PremiumButton} object
 */
export function PremiumButton(skuID: string, props?: PremiumButtonProps): PremiumButton {
	return { ...props, skuID, style: 6, type: 2 };
}

export type StringSelectProps = Omit<StringSelectMenu, "customID" | "options" | "type">;

/**
 * Create a {@link ComponentTypes.STRING_SELECT | STRING_SELECT} component.
 * Selection can be handled with {@link ClientEvents.interactionCreate}.
 * @param customID custom ID to handle interactions
 * @param options list of options
 * @param props optional properties (disabled, id, maxValues, minValues, placeholder)
 * @returns a {@link StringSelectMenu} object
 */
export function StringSelect(customID: string, options: SelectOption[] = [], props?: StringSelectProps): StringSelectMenu {
	return { ...props, customID, options, type: 3 };
}

export type SelectOptionProps = Omit<SelectOption, "label" | "value">;

export function SelectOption(label: string, value: string, props?: SelectOptionProps): SelectOption {
	return { ...props, label, value };
}

export type TextInputProps = Omit<TextInput, "label" | "customID" | "style" | "type">;

/**
 * Create a {@link ComponentTypes.TEXT_INPUT | TEXT_INPUT} component with the {@link TextInputStyles.SHORT | SHORT} style.
 * Submission can be handled with {@link ClientEvents.interactionCreate}.
 * @param customID custom ID to handle interactions
 * @param options list of options
 * @param props optional properties (id, maxLength, minLength, placeholder, required, value)
 * @returns a {@link TextInput} object
 */
export function LineInput(label: string, customID: string, props?: TextInputProps): TextInput {
	return { ...props, label, customID, style: 1 /* .SHORT */, type: 4 };
}

/**
 * Create a {@link ComponentTypes.TEXT_INPUT | TEXT_INPUT} component with the {@link TextInputStyles.PARAGRAPH | PARAGRAPH} style.
 * Submission can be handled with {@link ClientEvents.interactionCreate}.
 * @param customID custom ID to handle interactions
 * @param options list of options
 * @param props optional properties (id, maxLength, minLength, placeholder, required, value)
 * @returns a {@link TextInput} object
 */
export function ParagraphInput(label: string, customID: string, props?: TextInputProps): TextInput {
	return { ...props, label, customID, style: 2 /* .PARAGRAPH */, type: 4 };
}

export type UserSelectProps = Omit<UserSelectMenu, "customID" | "type">;

/**
 * Create a {@link ComponentTypes.USER_SELECT | USER_SELECT} component.
 * Selection can be handled with {@link ClientEvents.interactionCreate}.
 * @param customID custom ID to handle interactions
 * @param props optional properties (defaultValues, disabled, id, maxValues, minValues, placeholder)
 * @returns a {@link UserSelectMenu} object
 */
export function UserSelect(customID: string, props?: UserSelectProps): UserSelectMenu {
	return { ...props, customID, type: 5 };
}

export type RoleSelectProps = Omit<RoleSelectMenu, "customID" | "type">;

/**
 * Create a {@link ComponentTypes.ROLE_SELECT | ROLE_SELECT} component.
 * Selection can be handled with {@link ClientEvents.interactionCreate}.
 * @param customID custom ID to handle interactions
 * @param props optional properties (defaultValues, disabled, id, maxValues, minValues, placeholder)
 * @returns a {@link RoleSelectMenu} object
 */
export function RoleSelect(customID: string, props?: RoleSelectProps): RoleSelectMenu {
	return { ...props, customID, type: 6 };
}

export type MentionableSelectProps = Omit<MentionableSelectMenu, "customID" | "type">;

/**
 * Create a {@link ComponentTypes.MENTIONABLE_SELECT | MENTIONABLE_SELECT} component.
 * Selection can be handled with {@link ClientEvents.interactionCreate}.
 * @param customID custom ID to handle interactions
 * @param props optional properties (defaultValues, disabled, id, maxValues, minValues, placeholder)
 * @returns a {@link RoleSelectMenu} object
 */
export function MentionableSelect(customID: string, props?: MentionableSelectProps): MentionableSelectMenu {
	return { ...props, customID, type: 7 };
}

export type ChannelSelectProps = Omit<ChannelSelectMenu, "customID" | "channelTypes" | "type">;

/**
 * Create a {@link ComponentTypes.CHANNEL_SELECT | CHANNEL_SELECT} component.
 * Selection can be handled with {@link ClientEvents.interactionCreate}.
 * @param customID custom ID to handle interactions
 * @param props optional properties (defaultValues, disabled, id, maxValues, minValues, placeholder)
 * @returns a {@link RoleSelectMenu} object
 */
export function ChannelSelect(customID: string, channelTypes: ChannelTypes[], props?: ChannelSelectProps): ChannelSelectMenu {
	return { ...props, customID, channelTypes, type: 8 };
}

export type SectionProps = Omit<SectionComponent, "components" | "accessory" | "type">;

/**
 * Create a {@link ComponentTypes.SECTION | SECTION} component.
 * @param rows 1 to 3 rows of text
 * @param accessory thumnail or button appearing on the right
 * @param props optional properties (id)
 * @returns a {@link SectionComponent}
 */
export function Section(rows: string[], accessory: SectionComponent["accessory"], props?: SectionProps): SectionComponent {
	const components = rows.map(row => Text(row));
	return { ...props, components, accessory, type: 9 };
}

export type TextProps = Omit<TextDisplayComponent, "content" | "type">;

/**
 * Create a {@link ComponentTypes.TEXT_DISPLAY | TEXT_DISPLAY} component.
 * @param content markdown text
 * @param optional properties (id)
 * @returns a {@link TextDisplayComponent}
 */
export function Text(content: string, props?: TextProps): TextDisplayComponent {
	return { ...props, content, type: 10 };
}

export type ThumbnailProps = Omit<ThumbnailComponent, "media" | "type">;

/**
 * Create a {@link ComponentTypes.THUMBNAIL | THUMBNAIL} component.
 * @param url media URL
 * @param props optional properties (description, id, spoiler)
 * @returns a {@link ThumbnailComponent}
 */
export function Thumbnail(url: string, props?: ThumbnailProps): ThumbnailComponent {
	return { ...props, media: { url }, type: 11 };
}

export type GalleryProps = Omit<MediaGalleryComponent, "items" | "type">;

/**
 * Create a {@link ComponentTypes.MEDIA_GALLERY | MEDIA_GALLERY} component.
 * @param url media URL
 * @param props optional properties (id)
 * @returns a {@link MediaGalleryComponent}
 */
export function Gallery(items: MediaGalleryItem[] = [], props?: GalleryProps): MediaGalleryComponent {

	return { ...props, items, type: 12 };
}

export type GalleryItemProps = Omit<MediaGalleryItem, "media">;

/**
 * Create a media gallery item.
 * @param url media URL
 * @param props optional properties (description, spoiler)
 * @returns a {@link MediaGalleryItem}
 */
export function GalleryItem(url: string, props?: GalleryItemProps): MediaGalleryItem {
	return { ...props, media: { url } };
}

export type FileProps = Omit<FileComponent, "file" | "type">;

/**
 * Create a {@link ComponentTypes.FILE | FILE} component.
 * @param file the filename used in {@link CreateMessageOptions.files} - without the attachment:// prefix
 * @param props optional properties (id, spoiler)
 * @returns a {@link FileComponent}
 */
export function File(file: string, props?: FileProps): FileComponent {
	return { ...props, file: { url: "attachment://" + file }, type: 13 };
}

export type SeparatorProps = Omit<SeparatorComponent, "divider" | "spacing" | "type">;

/**
 * Create a non-divider {@link ComponentTypes.SEPARATOR | SEPARATOR} component.
 * @param spacing spacing size
 * @param props optional properties (id)
 * @returns a {@link SeparatorComponent}
 */
export function Spacer(spacing?: SeparatorSpacingSize, props?: SeparatorProps): SeparatorComponent {
	return { ...props, spacing, divider: false, type: 14 };
}
/**
 * Create a divider {@link ComponentTypes.SEPARATOR | SEPARATOR} component.
 * @param spacing spacing size
 * @param props optional properties (id)
 * @returns a {@link SeparatorComponent}
 */
export function Divider(spacing?: SeparatorSpacingSize, props?: SeparatorProps): SeparatorComponent {
	return { ...props, spacing, divider: true, type: 14 };
}

export type ContainerProps = Omit<ContainerComponent, "type" | "components">;

/**
 * Create a {@link ComponentTypes.CONTAINER | CONTAINER} component.
 * @param items child components to appear in the container
 * @param props optional properties (accentColor, id, spoiler)
 * @returns a {@link ContainerComponent}
 */
export function Container(items: ContainerComponent["components"] = [], props?: ContainerProps): ContainerComponent {
	return { ...props, components: items, type: 17 };
}