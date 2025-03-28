'use client';

import { useJobKompassAssets } from '@/app/helpers/hooks/useJobKompassAssets';
import { useJobKompassTheme } from '@/app/helpers/providers/themeProvider';
import { useJobKompassUser } from '@/app/helpers/providers/userProvider';
import SplashScreen from '@/app/jkUtilities_and_Tokens/components/splashScreen';
import { createSupClientInstance } from '@/app/utils/supabase/client';
import { useSidebar } from '@/components/ui/sidebar';
import ConsoleHeader from '../../jkComponents/jkConsoleHeader';
import FeatureBoxes from './components/featureBoxes';
import QuickAdd from './components/quickAdd';
import RecentJobs from './components/recentJobs';
import ShortCuts from './components/shortcuts';

export default function Dashboard({ getJobInformationStagehand }: { getJobInformationStagehand: any }) {
    const { user, userDataIsLoading } = useJobKompassUser();
    const { styles } = useJobKompassTheme();
    const supabase = createSupClientInstance();
    const { open } = useSidebar()
    const { getAsset } = useJobKompassAssets();

    if (userDataIsLoading) {
        return (
            <div className="fixed w-screen z-[30] h-screen flex items-center justify-center">
                <SplashScreen />
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full relative" style={{ backgroundColor: styles.background }}>
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full mx-auto h-max flex flex-col gap-5">
                    <div style={{backgroundColor: styles.background}} className="sm:sticky top-0 left-0 right-0 z-10">
                        <div className="w-full mx-auto pt-16">
                            <div className="mb-6">
                                <ConsoleHeader
                                    headingText={`${user?.[0]?.username?.charAt(0).toUpperCase() + user?.[0]?.username?.slice(1)}`}
                                    subTitleText={`Your workspace`}
                                />
                            </div>

                            <div className="mb-6">
                                <FeatureBoxes />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-8 transform transition-all duration-700 hover:translate-y-[-2px]">
                            <RecentJobs />
                        </div>
                        <div className="space-y-8">
                            <div className="transform transition-all duration-700 hover:translate-y-[-2px]">
                                <QuickAdd user={user} handleGetJobWithStageHand={getJobInformationStagehand} />
                            </div>
                            <div className="transform transition-all duration-700 hover:translate-y-[-2px]">
                                <ShortCuts />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

