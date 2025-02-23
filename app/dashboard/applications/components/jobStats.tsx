
'use client'

import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Legend } from 'recharts'

export default function JobStats() {
    const { user } = useJobKompassUser()
    const { styles } = useJobKompassTheme()

    const stats = [
        { label: 'Total Applications', value: 25 },
        { label: 'Interviews', value: 8 },
        { label: 'Offers', value: 2 },
        { label: 'Rejected', value: 5 }
    ]

    const lineData = [
        { name: 'Jan', applications: 4 },
        { name: 'Feb', applications: 8 },
        { name: 'Mar', applications: 15 },
        { name: 'Apr', applications: 20 },
        { name: 'May', applications: 22 },
        { name: 'Jun', applications: 25 }
    ]

    const pieData = [
        { name: 'Pending', value: 10, color: styles.status.interested },
        { name: 'Interviewing', value: 8, color: styles.status.interviewing },
        { name: 'Offered', value: 2, color: styles.status.offer },
        { name: 'Rejected', value: 5, color: styles.status.rejected }
    ]

    return (
        <div className="w-full p-4 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                        style={{
                            backgroundColor: styles.card.background,
                            border: styles.card.border,
                            backdropFilter: 'blur(8px)'
                        }}
                    >
                        <h3 
                            className="text-sm font-medium mb-2"
                            style={{ color: styles.text.secondary }}
                        >
                            {stat.label}
                        </h3>
                        <p 
                            className="text-2xl font-bold"
                            style={{ color: styles.text.primary }}
                        >
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                <div 
                    className="p-4 rounded-lg h-[300px]"
                    style={{
                        backgroundColor: styles.card.background,
                        border: styles.card.border
                    }}
                >
                    <h3 
                        className="text-lg font-medium mb-4"
                        style={{ color: styles.text.primary }}
                    >
                        Application Trend
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData}>
                            <XAxis 
                                dataKey="name" 
                                stroke={styles.text.secondary}
                                tick={{ fill: styles.text.secondary, fontSize: '0.875rem' }}
                            />
                            <YAxis 
                                stroke={styles.text.secondary}
                                tick={{ fill: styles.text.secondary, fontSize: '0.875rem' }}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: styles.card.background,
                                    border: styles.card.border,
                                    borderRadius: '0.5rem'
                                }}
                                labelStyle={{ color: styles.text.primary, fontSize: '0.875rem' }}
                                itemStyle={{ color: styles.text.secondary, fontSize: '0.875rem' }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="applications" 
                                stroke={styles.text.primary}
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div 
                    className="p-4 rounded-lg h-[300px]"
                    style={{
                        backgroundColor: styles.card.background,
                        border: styles.card.border
                    }}
                >
                    <h3 
                        className="text-lg font-medium mb-4"
                        style={{ color: styles.text.primary }}
                    >
                        Application Status
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: styles.card.background,
                                    border: styles.card.border,
                                    borderRadius: '0.5rem',
                                    color: styles.text.primary
                                }}
                                labelStyle={{ color: styles.text.primary, fontSize: '0.875rem' }}
                                itemStyle={{ color: styles.text.secondary, fontSize: '0.875rem' }}
                            />
                            <Legend
                                formatter={(value: string) => (
                                    <span style={{ color: styles.text.secondary, fontSize: '0.875rem' }}>{value}</span>
                                )}
                                wrapperStyle={{
                                    fontSize: '0.875rem',
                                    color: styles.text.secondary
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}