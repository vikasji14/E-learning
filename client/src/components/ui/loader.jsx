import React from 'react'

export const Loader = () => {
    return (
        <div>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                <div className="flex items-center justify-center space-x-2">
                    
                    <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="text-white font-semibold text-lg">Loading...</span>
                </div>
            </div>
        </div>
    )
}
