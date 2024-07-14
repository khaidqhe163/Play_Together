import Donate from "../models/Donate.js";

const createDonate = async (objDonate) => {
    try {
        const aDonate = await Donate.create(objDonate);
        return aDonate;
    } catch (error) {
        throw new Error(error)
    }
};

const getAll = async () => {
    try {
        const allDonate = await Donate.find({});
        return allDonate;
    } catch (error) {
        throw new Error(error);
    }
}

const getTopDonorsByPeriod = async (period) => {
    const now = new Date();
    let startDate;

    if (period === 'week') {
        startDate = new Date(now.setDate(now.getDate() - now.getDay()));
    } else if (period === 'month') {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
        throw new Error('Invalid period specified. Use "week" or "month".');
    }

    return Donate.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate }
            }
        },
        {
            $group: {
                _id: '$userId',
                totalMoney: { $sum: '$money' }
            }
        },
        {
            $sort: { totalMoney: -1 }
        },
        {
            $limit: 10
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                userId: '$_id',
                totalMoney: 1,
                'user.username': 1,
                'user.email': 1,
                'user.avatar': 1
            }
        }
    ]);
};

export default {
    createDonate,
    getAll,
    getTopDonorsByPeriod,
}
