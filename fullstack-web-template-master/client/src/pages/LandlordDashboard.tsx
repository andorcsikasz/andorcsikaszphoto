import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Buildings,
  ChartLine,
  CurrencyDollar,
  Eye,
  EnvelopeSimple,
  Star,
  TrendUp,
  TrendDown,
  CheckCircle,
  ClockCounterClockwise,
  FileText,
  CreditCard,
  ListChecks,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";

// Mock landlord ID - in real app this would come from auth context
const MOCK_LANDLORD_ID = 1;

// Mock monthly earnings data for charts
const monthlyEarningsData = [
  { month: "Jan", earnings: 380000, predicted: 385000 },
  { month: "Feb", earnings: 420000, predicted: 425000 },
  { month: "Mar", earnings: 450000, predicted: 455000 },
  { month: "Apr", earnings: 480000, predicted: 485000 },
  { month: "May", earnings: 510000, predicted: 515000 },
  { month: "Jun", earnings: 542000, predicted: 550000 },
  { month: "Jul", predicted: 575000 },
  { month: "Aug", predicted: 590000 },
];

const occupancyData = [
  { month: "Jan", rate: 75 },
  { month: "Feb", rate: 80 },
  { month: "Mar", rate: 82 },
  { month: "Apr", rate: 85 },
  { month: "May", rate: 86 },
  { month: "Jun", rate: 87 },
];

export default function LandlordDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch dashboard metrics
  const { data: metrics, isLoading: metricsLoading } = trpc.landlord.metrics.useQuery({
    landlordId: MOCK_LANDLORD_ID,
  });

  const { data: inquiries, isLoading: inquiriesLoading } = trpc.landlord.inquiries.useQuery({
    landlordId: MOCK_LANDLORD_ID,
    limit: 10,
  });

  const { data: propertyPerformance, isLoading: performanceLoading } = trpc.landlord.propertyPerformance.useQuery({
    landlordId: MOCK_LANDLORD_ID,
  });

  if (metricsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Upcoming Payout",
      value: `${(542000).toLocaleString()} HUF`,
      icon: CurrencyDollar,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      subValue: "Next payout in 5 days",
    },
    {
      label: "Occupancy Rate",
      value: `${metrics?.occupancyRate || 87}%`,
      icon: ChartLine,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "up",
      subValue: "+2% from last month",
    },
    {
      label: "Avg Stay Duration",
      value: "7.5 months",
      icon: ClockCounterClockwise,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Active Properties",
      value: metrics?.activeListings || 0,
      icon: Buildings,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Buildings className="h-7 w-7" weight="duotone" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">Landlord Dashboard</h1>
                <p className="text-blue-100">Manage your properties and track performance</p>
              </div>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 bg-white/10 backdrop-blur-sm text-white">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center`}>
                          <stat.icon className="h-5 w-5 text-white" weight="duotone" />
                        </div>
                        {stat.trend === "up" && (
                          <TrendUp className="h-4 w-4 text-green-300" weight="bold" />
                        )}
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-blue-100 mb-1">{stat.label}</div>
                      {stat.subValue && (
                        <div className="text-xs text-blue-200">{stat.subValue}</div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <ChartLine className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2 py-3">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Contracts</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2 py-3">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2 py-3">
              <Buildings className="h-4 w-4" />
              <span className="hidden sm:inline">Properties</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2 py-3">
              <ListChecks className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Earnings Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Monthly Earnings</CardTitle>
                    <CardDescription>Actual vs Predicted revenue (HUF)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlyEarningsData}>
                        <defs>
                          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="earnings"
                          stroke="#8b5cf6"
                          fillOpacity={1}
                          fill="url(#colorEarnings)"
                          name="Actual Earnings"
                        />
                        <Area
                          type="monotone"
                          dataKey="predicted"
                          stroke="#06b6d4"
                          strokeDasharray="5 5"
                          fillOpacity={1}
                          fill="url(#colorPredicted)"
                          name="Predicted"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Occupancy Rate Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Occupancy Rate Trend</CardTitle>
                    <CardDescription>6-month performance (%)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={occupancyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="rate" fill="#8b5cf6" name="Occupancy %" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Total Views", value: (metrics?.totalViews || 0).toLocaleString(), icon: Eye, gradient: "from-blue-500 to-cyan-600" },
                { label: "Total Inquiries", value: metrics?.totalInquiries || 0, icon: EnvelopeSimple, gradient: "from-purple-500 to-pink-600" },
                { label: "Conversion Rate", value: `${metrics?.conversionRate?.toFixed(1) || 0}%`, icon: TrendUp, gradient: "from-orange-500 to-red-600" },
                { label: "Average Rating", value: `${metrics?.averageRating?.toFixed(1) || 0}/5`, icon: Star, gradient: "from-yellow-500 to-orange-600" },
                { label: "New Inquiries", value: metrics?.newInquiriesThisWeek || 0, icon: ClockCounterClockwise, gradient: "from-indigo-500 to-purple-600" },
                { label: "Total Revenue", value: `${(metrics?.totalRevenue || 0).toLocaleString()} HUF`, icon: CurrencyDollar, gradient: "from-green-500 to-emerald-600" },
              ].map((kpi, index) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Card className={`border-0 bg-gradient-to-br ${kpi.gradient} text-white`}>
                    <CardContent className="p-4 text-center">
                      <kpi.icon className="h-8 w-8 mx-auto mb-2 opacity-80" weight="duotone" />
                      <div className="text-2xl font-bold mb-1">{kpi.value}</div>
                      <div className="text-xs opacity-90">{kpi.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Performing Property */}
              {metrics?.topPerformingProperty && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-600" weight="duotone" />
                      Top Performing Property
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-2">{metrics.topPerformingProperty.title}</h3>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Bookings</div>
                          <div className="text-2xl font-bold text-purple-600">
                            {metrics.topPerformingProperty.bookings}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Revenue</div>
                          <div className="text-2xl font-bold text-green-600">
                            {metrics.topPerformingProperty.revenue.toLocaleString()} HUF
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Inquiries */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <EnvelopeSimple className="h-5 w-5 text-purple-600" weight="duotone" />
                    Recent Inquiries
                  </CardTitle>
                  <CardDescription>Latest 5 leads</CardDescription>
                </CardHeader>
                <CardContent>
                  {inquiriesLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                  ) : inquiries && inquiries.length > 0 ? (
                    <div className="space-y-3">
                      {inquiries.slice(0, 5).map((item) => (
                        <div
                          key={item.inquiry.id}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-semibold">{item.property.title}</div>
                            <Badge variant={
                              item.inquiry.status === 'new' ? 'default' :
                              item.inquiry.status === 'converted' ? 'default' :
                              'secondary'
                            }>
                              {item.inquiry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.inquiry.message}
                          </p>
                          <div className="text-xs text-muted-foreground mt-2">
                            {new Date(item.inquiry.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No recent inquiries
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contracts Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
                <CardDescription>Manage tenant agreements and contracts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" weight="duotone" />
                  <p className="text-lg font-semibold mb-2">No active contracts</p>
                  <p>Contract management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Track all incoming and outgoing payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <CreditCard className="h-16 w-16 mx-auto mb-4 opacity-50" weight="duotone" />
                  <p className="text-lg font-semibold mb-2">No payment history</p>
                  <p>Payment tracking coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartLine className="h-5 w-5 text-blue-600" weight="duotone" />
                  Property Performance
                </CardTitle>
                <CardDescription>Individual property metrics and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                {performanceLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading...</div>
                ) : propertyPerformance && propertyPerformance.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-semibold text-sm">Property</th>
                          <th className="text-center py-3 px-2 font-semibold text-sm">Views</th>
                          <th className="text-center py-3 px-2 font-semibold text-sm">Inquiries</th>
                          <th className="text-center py-3 px-2 font-semibold text-sm">Bookings</th>
                          <th className="text-right py-3 px-2 font-semibold text-sm">Revenue</th>
                          <th className="text-center py-3 px-2 font-semibold text-sm">Rating</th>
                          <th className="text-center py-3 px-2 font-semibold text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {propertyPerformance.map((property) => (
                          <tr key={property.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2">
                              <div className="font-medium">{property.title}</div>
                              <div className="text-xs text-muted-foreground">{property.city}</div>
                            </td>
                            <td className="text-center py-3 px-2">{property.views}</td>
                            <td className="text-center py-3 px-2">{property.inquiries}</td>
                            <td className="text-center py-3 px-2 font-semibold">{property.bookings}</td>
                            <td className="text-right py-3 px-2 font-semibold text-green-600">
                              {property.revenue.toLocaleString()} HUF
                            </td>
                            <td className="text-center py-3 px-2">
                              <div className="flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 text-yellow-600" weight="fill" />
                                <span className="font-semibold">{property.averageRating}</span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-2">
                              {property.available ? (
                                <Badge variant="default" className="bg-green-600">Active</Badge>
                              ) : (
                                <Badge variant="secondary">Inactive</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No properties found
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Tenant Applications</CardTitle>
                <CardDescription>Review and manage incoming applications</CardDescription>
              </CardHeader>
              <CardContent>
                {inquiriesLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading...</div>
                ) : inquiries && inquiries.length > 0 ? (
                  <div className="space-y-4">
                    {inquiries.map((item) => (
                      <div
                        key={item.inquiry.id}
                        className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{item.property.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.property.city}</p>
                          </div>
                          <Badge variant={
                            item.inquiry.status === 'new' ? 'default' :
                            item.inquiry.status === 'converted' ? 'default' :
                            'secondary'
                          } className="text-sm">
                            {item.inquiry.status}
                          </Badge>
                        </div>
                        <div className="bg-white p-4 rounded-lg mb-4">
                          <p className="text-sm">{item.inquiry.message}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            Applied {new Date(item.inquiry.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Review</Button>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">Contact</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <ListChecks className="h-16 w-16 mx-auto mb-4 opacity-50" weight="duotone" />
                    <p className="text-lg font-semibold mb-2">No applications yet</p>
                    <p>Applications will appear here when tenants express interest</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
