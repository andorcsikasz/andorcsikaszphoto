import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Buildings,
  ChartLine,
  CurrencyDollar,
  Eye,
  EnvelopeSimple,
  Star,
  TrendUp,
  TrendDown,
  CalendarBlank,
  Users,
  CheckCircle,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";

// Mock landlord ID - in real app this would come from auth context
const MOCK_LANDLORD_ID = 1;

export default function LandlordDashboard() {
  // Fetch dashboard metrics
  const { data: metrics, isLoading: metricsLoading } = trpc.landlord.metrics.useQuery({
    landlordId: MOCK_LANDLORD_ID,
  });

  const { data: inquiries, isLoading: inquiriesLoading } = trpc.landlord.inquiries.useQuery({
    landlordId: MOCK_LANDLORD_ID,
    limit: 5,
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
      label: "Total Properties",
      value: metrics?.totalProperties || 0,
      icon: Buildings,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: null,
    },
    {
      label: "Active Listings",
      value: metrics?.activeListings || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: null,
    },
    {
      label: "Occupancy Rate",
      value: `${metrics?.occupancyRate || 0}%`,
      icon: ChartLine,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: metrics?.occupancyRate && metrics.occupancyRate > 75 ? "up" : "neutral",
    },
    {
      label: "Total Revenue",
      value: `$${(metrics?.totalRevenue || 0).toLocaleString()}`,
      icon: CurrencyDollar,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      trend: metrics?.revenueGrowth && metrics.revenueGrowth > 0 ? "up" : metrics?.revenueGrowth && metrics.revenueGrowth < 0 ? "down" : "neutral",
      subValue: `${metrics?.revenueGrowth || 0}% vs last month`,
    },
  ];

  const kpis = [
    {
      label: "Monthly Revenue",
      value: `$${(metrics?.monthlyRevenue || 0).toLocaleString()}`,
      icon: TrendUp,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      label: "Total Views",
      value: (metrics?.totalViews || 0).toLocaleString(),
      icon: Eye,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      label: "Total Inquiries",
      value: metrics?.totalInquiries || 0,
      icon: EnvelopeSimple,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      label: "Conversion Rate",
      value: `${metrics?.conversionRate || 0}%`,
      icon: ChartLine,
      gradient: "from-orange-500 to-red-600",
    },
    {
      label: "Average Rating",
      value: `${metrics?.averageRating || 0}/5`,
      icon: Star,
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      label: "New Inquiries (7d)",
      value: metrics?.newInquiriesThisWeek || 0,
      icon: ClockCounterClockwise,
      gradient: "from-indigo-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Buildings className="h-7 w-7" weight="duotone" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">Landlord Dashboard</h1>
                <p className="text-blue-100">Manage your properties and track performance</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        {/* Main Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} weight="duotone" />
                    </div>
                    {stat.trend === "up" && (
                      <TrendUp className="h-5 w-5 text-green-600" weight="bold" />
                    )}
                    {stat.trend === "down" && (
                      <TrendDown className="h-5 w-5 text-red-600" weight="bold" />
                    )}
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  {stat.subValue && (
                    <div className="text-xs text-muted-foreground">{stat.subValue}</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
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

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Performing Property */}
          {metrics?.topPerformingProperty && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
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
                          ${metrics.topPerformingProperty.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Recent Inquiries */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <EnvelopeSimple className="h-5 w-5 text-purple-600" weight="duotone" />
                  Recent Inquiries
                </CardTitle>
                <CardDescription>Latest leads and messages</CardDescription>
              </CardHeader>
              <CardContent>
                {inquiriesLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading...</div>
                ) : inquiries && inquiries.length > 0 ? (
                  <div className="space-y-3">
                    {inquiries.map((item) => (
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
          </motion.div>
        </div>

        {/* Property Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
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
                            ${property.revenue.toLocaleString()}
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
        </motion.div>
      </div>
    </div>
  );
}
