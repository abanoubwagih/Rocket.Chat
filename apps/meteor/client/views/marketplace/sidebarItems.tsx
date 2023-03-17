import { Badge, Skeleton } from '@rocket.chat/fuselage';
import React from 'react';

import { hasPermission } from '../../../app/authorization/client';
import { createSidebarItems } from '../../lib/createSidebarItems';
import { useAppRequestStats } from './hooks/useAppRequestStats';

const MarketplaceRequestBadge = () => {
	const requestStatsResult = useAppRequestStats();

	if (requestStatsResult.isLoading)
		return requestStatsResult.fetchStatus !== 'idle' ? <Skeleton variant='circle' height='x16' width='x16' /> : null;

	if (requestStatsResult.isError) return null;

	if (!requestStatsResult.data.data.totalUnseen) {
		return null;
	}

	return <Badge variant='primary'>{requestStatsResult.data.data.totalUnseen}</Badge>;
};

export const {
	registerSidebarItem: registerMarketplaceSidebarItem,
	unregisterSidebarItem: unregisterMarketplaceSidebarItem,
	getSidebarItems: getMarketplaceSidebarItems,
	subscribeToSidebarItems: subscribeToMarketplaceSidebarItems,
} = createSidebarItems([
	{
		href: 'marketplace/explore',
		icon: 'compass',
		i18nLabel: 'Explore',
	},
	{
		href: 'marketplace/enterprise',
		icon: 'lightning',
		i18nLabel: 'Enterprise',
	},
	{
		href: 'marketplace/installed',
		icon: 'circle-arrow-down',
		i18nLabel: 'Installed',
	},
	{
		href: 'marketplace/requested',
		icon: 'cube',
		i18nLabel: 'Requested',
		badge: () => <MarketplaceRequestBadge />,
		permissionGranted: (): boolean => hasPermission('manage-apps'),
	},
	{
		href: 'marketplace/private',
		icon: 'lock',
		i18nLabel: 'Private_Apps',
	},
	{ divider: true, i18nLabel: 'marketplace/private' },
	{
		href: 'https://go.rocket.chat/i/developing-an-app',
		icon: 'new-window',
		i18nLabel: 'Documentation',
		externalUrl: true,
	},
	{ divider: true, i18nLabel: 'marketplace/Documentation' },
]);
