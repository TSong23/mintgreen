class Api::WatchlistsController < ApplicationController
  
  def index
    @watchlists = Watchlist.all 
    if @watchlists
      render :index 
    else 
      render json: ["No watchlists"]
    end
  end

  def new
    @watchlist = Watchlist.new(watchlist_params)    
    if @watchlist.save
      render "api/watchlist/show"
    else
      render json: @watchlist.errors.full_messages, status: 422
    end
  end

  def show
    @watchlist = Watchlist.find_by(id: params[:id]);
    if @watchlist
      render "api/watchlists/show"
    else
      render json: ["Watchlist does not exist"], status: 404
    end
  end

  # def edit

  # end

  # def update
  # end



  # def destroy

  # end

  private 

  def watchlist_params
    params.require(:watchlist).permit(:user_id)
  end

end
